from flask import render_template, request, Blueprint, url_for, redirect, flash
from flask_login import current_user

from flask_sqlalchemy import query

import random

from turnierseite.turnier.models import Turnier, Gruppe, Team, Spiele
from turnierseite.turnier.turnierForm import TurnierForm, GruppeForm, TeamForm, SpieleForm

from turnierseite.app import db


turnier = Blueprint('turnier', __name__, template_folder='templates')

def lade_turnier_daten(turnier_id):
    turnier = Turnier.query.filter(Turnier.id == turnier_id).first()
    turnier_form = TurnierForm(obj=turnier)
    gruppen = Gruppe.query.filter(Gruppe.turnierId == turnier_id).all()

    # Create a dictionary to hold teams for each group, ordered by punkte
    gruppen_teams = {}
    for gruppe in gruppen:
        teams = Team.query.filter(Team.gruppeId == gruppe.id).order_by(Team.punkte.desc()).all()
        gruppen_teams[gruppe.id] = teams

    return turnier, turnier_form, gruppen, gruppen_teams

@turnier.route('/')
def index():
    alle_turniere = Turnier.query.all()
    return render_template("turnier/turnier_overview.html", alle_turniere=alle_turniere)


@turnier.route('/turnier_erstellen', methods=['GET', 'POST'])
def turnier_erstellen():
    turnier_form = TurnierForm()
    if request.method == 'GET':
        return render_template("turnier/turnier_erstellen.html", form=turnier_form)
    elif request.method == 'POST':
        #insert des neuen Turnieres in die Datenbank
        turnier = Turnier(name=turnier_form.name.data, datumDerAustragung=turnier_form.datumDerAustragung.data)
        db.session.add(turnier)
        db.session.commit()

        #laden eines neuen html
        return redirect(url_for('turnier.index'))

@turnier.route('/turnier_entfernen/<turnier_id>')
def turnier_entfernen(turnier_id):
    gruppen = Gruppe.query.filter(Gruppe.turnierId == turnier_id).all()
    if gruppen:
        flash('es existieren noch Gruppen für das Turnier')

        turnier, turnier_form, gruppen, gruppen_teams = lade_turnier_daten(turnier_id)
        # Render the updated template
        return render_template('turnier/turnier_details.html', turnier_form=turnier_form, turnier=turnier, gruppen=gruppen, gruppen_teams=gruppen_teams)

    turnier = Turnier.query.filter(Turnier.id == turnier_id).first()
    if turnier:
        db.session.delete(turnier)
        db.session.commit()
        return redirect(url_for('turnier.index'))

@turnier.route('/turnier_details/<turnier_id>', methods=['GET', 'POST'])
def turnier_details(turnier_id):
    turnier, turnier_form, gruppen, gruppen_teams = lade_turnier_daten(turnier_id)

    if request.method == 'POST':
        # Retrieve the Turnier instance
        turnier = Turnier.query.get(turnier_id)

        if turnier_form.validate_on_submit():
            # Update the Turnier instance with form data
            turnier.name = turnier_form.name.data
            turnier.datumDerAustragung = turnier_form.datumDerAustragung.data

            db.session.add(turnier)

            # Commit the changes to the database
            db.session.commit()

    # Load a new HTML template with the updated data
    return render_template('turnier/turnier_details.html', turnier_form=turnier_form, turnier=turnier, gruppen=gruppen, gruppen_teams=gruppen_teams)

@turnier.route('/gruppe_erstellen/<turnier_id>', methods=['GET', 'POST'])
def gruppe_erstellen(turnier_id):
    gruppe_form = GruppeForm()
    if request.method == 'GET':
        turnier, turnier_form, gruppen, gruppen_teams = lade_turnier_daten(turnier_id)

        return render_template("gruppe/gruppe_erstellen.html", turnier=turnier, turnier_form=turnier_form, gruppe_form=gruppe_form, gruppen=gruppen, gruppen_teams=gruppen_teams)
    elif request.method == 'POST':
        #insert des neuen Turnieres in die Datenbank
        gruppe = Gruppe(turnierId=turnier_id, name=gruppe_form.name.data)
        db.session.add(gruppe)
        db.session.commit()

        turnier, turnier_form, gruppen, gruppen_teams = lade_turnier_daten(turnier_id)
        #laden eines neuen html
        return render_template('turnier/turnier_details.html', turnier_form=turnier_form, turnier=turnier, gruppen=gruppen, gruppen_teams=gruppen_teams)

@turnier.route('/gruppe_entfernen/<turnier_id>/<gruppe_id>')
def gruppe_entfernen(turnier_id, gruppe_id):
    teams = Team.query.filter(Team.gruppeId == gruppe_id).all()
    if teams:
        flash('es existieren noch Teams für die Gruppe')

        turnier, turnier_form, gruppen, gruppen_teams = lade_turnier_daten(turnier_id)
        # Render the updated template
        return render_template('turnier/turnier_details.html', turnier_form=turnier_form, turnier=turnier, gruppen=gruppen, gruppen_teams=gruppen_teams)

    gruppe = Gruppe.query.get(gruppe_id)
    if gruppe:
        db.session.delete(gruppe)
        db.session.commit()
    else:
        flash(f"Gruppe mit id {gruppe_id} nicht gefunden.")

    turnier, turnier_form, gruppen, gruppen_teams = lade_turnier_daten(turnier_id)

    # Render the updated template
    return render_template('turnier/turnier_details.html', turnier_form=turnier_form, turnier=turnier, gruppen=gruppen, gruppen_teams=gruppen_teams)


@turnier.route('/team_erstellen/<turnier_id>', methods=['GET', 'POST'])
def team_erstellen(turnier_id):
    team_form = TeamForm()
    if request.method == 'GET':
        turnier, turnier_form, gruppen, gruppen_teams = lade_turnier_daten(turnier_id)

        return render_template("team/team_erstellen.html", turnier=turnier, turnier_form=turnier_form, team_form=team_form, gruppen=gruppen, gruppen_teams=gruppen_teams)
    elif request.method == 'POST':
        #insert des neuen Turnieres in die Datenbank
        gruppen_in_turnier = []
        gruppen = Gruppe.query.filter(Gruppe.turnierId == turnier_id).all()
        for gruppe in gruppen:
            gruppen_in_turnier.append(gruppe.id)

        if int(team_form.gruppe.data) in gruppen_in_turnier:
            team = Team(gruppeId=team_form.gruppe.data, name=team_form.name.data, punkte=0, treffer=0, gegentreffer=0)
            db.session.add(team)
            db.session.commit()
        else:
            flash(f"Die Ausgewählte Gruppe existiert nicht.")

        turnier, turnier_form, gruppen, gruppen_teams = lade_turnier_daten(turnier_id)
        #laden eines neuen html
        return render_template('turnier/turnier_details.html', turnier_form=turnier_form, turnier=turnier, gruppen=gruppen, gruppen_teams=gruppen_teams)

@turnier.route('/team_entfernen/<turnier_id>/<team_id>')
def team_entfernen(turnier_id, team_id):
    spiele = Spiele.query.filter(Spiele.team1Id == team_id).all()
    if spiele:
        flash('es existieren noch Spiele für das Team')

        turnier, turnier_form, gruppen, gruppen_teams = lade_turnier_daten(turnier_id)
        # Render the updated template
        return render_template('turnier/turnier_details.html', turnier_form=turnier_form, turnier=turnier, gruppen=gruppen, gruppen_teams=gruppen_teams)

    team = Team.query.get(team_id)
    if team:
        db.session.delete(team)
        db.session.commit()

        turnier, turnier_form, gruppen, gruppen_teams = lade_turnier_daten(turnier_id)
        # Render the updated template
        return render_template('turnier/turnier_details.html', turnier_form=turnier_form, turnier=turnier, gruppen=gruppen, gruppen_teams=gruppen_teams)


@turnier.route('/spielplan_erstellen/<turnier_id>/<gruppe_id>')
def spielplan_erstellen(turnier_id, gruppe_id):
    team = Team.query.filter(Team.gruppeId == gruppe_id).first()
    spiele = Spiele.query.filter(Spiele.team1Id == team.id).all()
    if spiele:
        flash('es existieren bereits Spiele für die Gruppe')

    else:
        # Erstellen einer Liste aller Teams in der Gruppe
        teams_der_gruppe_objekte = Team.query.filter(Team.gruppeId == gruppe_id).all()

        teams_der_gruppe_str = []
        for team in teams_der_gruppe_objekte:
            team_string = str(team.id) + ". " + team.name
            teams_der_gruppe_str.append(team_string)

        paare_der_hinrunde = []
        paare_der_rueckrunde = []
        for index_i,team_i in enumerate(teams_der_gruppe_str):
            for index_j,team_j in enumerate(teams_der_gruppe_str[index_i+1:], start=index_i+1):
                paare_der_hinrunde.append((team_i, team_j))
                paare_der_rueckrunde.append((team_j, team_i))

        alle_runden = paare_der_hinrunde + paare_der_rueckrunde
        random.shuffle(alle_runden)

        anzahl_spiele = len(teams_der_gruppe_str) * (len(teams_der_gruppe_str) - 1)

        runden_aufsetzen = {}
        runden_counter = 0
        spiele_counter = 0
        runden_aktuelle_gruppe = []
        while spiele_counter != anzahl_spiele:
            random.shuffle(alle_runden)
            runden_counter += 1
            paare_der_runden = []
            teams_haben_gespielt = []
            for paar in alle_runden:
                team_1, team_2 = paar
                schon_gespielt = False
                for _, value in runden_aufsetzen.items():
                    if paar in value:
                        schon_gespielt = True

                if not schon_gespielt and team_1 not in teams_haben_gespielt and team_2 not in teams_haben_gespielt:
                    paare_der_runden.append(paar)
                    teams_haben_gespielt.append(team_1)
                    teams_haben_gespielt.append(team_2)
                    spiele_counter += 1

            runden_aufsetzen[runden_counter] = paare_der_runden

        for runde in runden_aufsetzen.keys():
            for spiel in runden_aufsetzen[runde]:
                t1_id, t1_name = spiel[0].split('. ')
                t2_id, t2_name = spiel[1].split('. ')
                spiel = Spiele(team1Id=int(t1_id), team1Name=t1_name, team2Id=t2_id, team2Name=t2_name, gespielt=0, runde=runde, toreT1=0, toreT2=0, gruppeId=gruppe_id)
                db.session.add(spiel)
        db.session.commit()
    turnier, turnier_form, gruppen, gruppen_teams = lade_turnier_daten(turnier_id)
    # Render the updated template
    return render_template('turnier/turnier_details.html', turnier_form=turnier_form, turnier=turnier, gruppen=gruppen, gruppen_teams=gruppen_teams)
