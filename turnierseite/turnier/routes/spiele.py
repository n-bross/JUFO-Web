# turnierseite/turnier/routes/spiele.py
from flask import Blueprint, render_template, flash, redirect, url_for

import random

from turnierseite.turnier.models import Turnier, Gruppe, Team, Spiele
from turnierseite.turnier.routes.turnier import lade_turnier_daten
from turnierseite.app import db

spiele = Blueprint('spiele', __name__, template_folder='../templates')

@spiele.route('/spiele_erstellen/<turnier_id>/<gruppe_id>')
def spiele_erstellen(turnier_id, gruppe_id):
    team = Team.query.filter(Team.gruppeId == gruppe_id).first()
    spiele = Spiele.query.filter(Spiele.team1Id == team.id).all()
    if spiele:
        flash('Es existieren bereits Spiele für die Gruppe')
        return redirect(url_for('turnier.turnier_details', turnier_id=turnier_id))
    else:
        teams_der_gruppe_objekte = Team.query.filter(Team.gruppeId == gruppe_id).all()
        teams_der_gruppe_str = [str(team.id) + ". " + team.name for team in teams_der_gruppe_objekte]
        paare_der_hinrunde = [(team_i, team_j) for index_i, team_i in enumerate(teams_der_gruppe_str) for index_j, team_j in enumerate(teams_der_gruppe_str[index_i+1:], start=index_i+1)]
        paare_der_rueckrunde = [(team_j, team_i) for team_i, team_j in paare_der_hinrunde]
        alle_runden = paare_der_hinrunde + paare_der_rueckrunde
        random.shuffle(alle_runden)
        anzahl_spiele = len(teams_der_gruppe_str) * (len(teams_der_gruppe_str) - 1)
        runden_aufsetzen = {}
        runden_counter, spiele_counter = 0, 0
        while spiele_counter != anzahl_spiele:
            random.shuffle(alle_runden)
            runden_counter += 1
            paare_der_runden, teams_haben_gespielt = [], []
            for paar in alle_runden:
                team_1, team_2 = paar
                schon_gespielt = any(paar in value for value in runden_aufsetzen.values())
                if not schon_gespielt and team_1 not in teams_haben_gespielt and team_2 not in teams_haben_gespielt:
                    paare_der_runden.append(paar)
                    teams_haben_gespielt.extend([team_1, team_2])
                    spiele_counter += 1
            runden_aufsetzen[runden_counter] = paare_der_runden
        for runde in runden_aufsetzen.keys():
            for spiel in runden_aufsetzen[runde]:
                t1_id, t1_name = spiel[0].split('. ')
                t2_id, t2_name = spiel[1].split('. ')
                spiel = Spiele(team1Id=int(t1_id), team1Name=t1_name, team2Id=t2_id, team2Name=t2_name, gespielt=0, runde=runde, toreT1=0, toreT2=0, gruppeId=gruppe_id)
                db.session.add(spiel)
        db.session.commit()
        flash(f'Die Spiele für die Gruppe ID: {gruppe_id} wurden angelegt')
    turnier, turnier_form, gruppen, gruppen_teams = lade_turnier_daten(turnier_id)
    return render_template('turnier/turnier_details.html', turnier_form=turnier_form, turnier=turnier, gruppen=gruppen, gruppen_teams=gruppen_teams)

@spiele.route('/spiele_overview/<turnier_id>')
def spiele_overview(turnier_id):
    gruppen = Gruppe.query.filter(Gruppe.turnierId == turnier_id).all()
    if not gruppen:
        flash('es existieren noch keine Gruppen das Turnier')
        return redirect(url_for('turnier.turnier_details', turnier_id=turnier_id))

    # Create a dictionary to hold teams for each group, ordered by punkte
    gruppen_teams = {}
    gruppen_spiele = {}
    for gruppe in gruppen:
        teams = Team.query.filter(Team.gruppeId == gruppe.id).order_by(Team.punkte.desc()).all()
        if not teams:
            flash('es existieren keine Teams für die Gruppe {gruppe.name}')
            return redirect(url_for('turnier.turnier_details', turnier_id=turnier_id))

        gruppen_teams[gruppe.id] = teams

        max_runde = Spiele.query.filter(Spiele.gruppeId == gruppe.id).order_by(Spiele.runde.desc()).first()

        if not max_runde:
            flash('es existieren keine Spiele für die Gruppe  {gruppe.name}')
            return redirect(url_for('turnier.turnier_details', turnier_id=turnier_id))

        max_runde = max_runde.runde
        print(max_runde)

        spiele = Spiele.query.filter(Spiele.gruppeId == gruppe.id).order_by(Spiele.runde.asc()).all()
        alle_runden = {}
        for i in range (1, max_runde+1):
            alle_runden[i] = []


        for spiel in spiele:
            alle_runden[spiel.runde].append(spiel)

        gruppen_spiele[gruppe.id] = alle_runden

    turnier = Turnier.query.filter(Turnier.id == turnier_id).first()
    return render_template('spiele/spiele_overview.html', turnier=turnier, gruppen=gruppen, gruppen_teams=gruppen_teams, gruppen_spiele=gruppen_spiele)


#spiel eintragen
#@team.route('/team_erstellen/<turnier_id>', methods=['GET', 'POST'])
#def team_erstellen(turnier_id):
#    team_form = TeamForm()
#    if request.method == 'GET':
#        turnier, turnier_form, gruppen, gruppen_teams = lade_turnier_daten(turnier_id)
#        return render_template("team/team_erstellen.html", turnier=turnier, turnier_form=turnier_form, team_form=team_form, gruppen=gruppen, gruppen_teams=gruppen_teams)
#    elif request.method == 'POST':
#        gruppen_in_turnier = [gruppe.id for gruppe in Gruppe.query.filter(Gruppe.turnierId == turnier_id).all()]
#        if int(team_form.gruppe.data) in gruppen_in_turnier:
#            team = Team(gruppeId=team_form.gruppe.data, name=team_form.name.data, punkte=0, treffer=0, gegentreffer=0)
#            db.session.add(team)
#            db.session.commit()
#        else:
#            flash(f"Die Ausgewählte Gruppe existiert nicht.")
#            return redirect(url_for('turnier.turnier_details', turnier_id=turnier_id))
#        turnier, turnier_form, gruppen, gruppen_teams = lade_turnier_daten(turnier_id)
#        return render_template('turnier/turnier_details.html', turnier_form=turnier_form, turnier=turnier, gruppen=gruppen, gruppen_teams=gruppen_teams)#

#spiel löschen, wenn es nicht gespielt werden sollte
#@team.route('/team_entfernen/<turnier_id>/<team_id>')
#def team_entfernen(turnier_id, team_id):
#    spiele = Spiele.query.filter(Spiele.team1Id == team_id).all()
#    if spiele:
#        flash('es existieren noch Spiele für das Team')
#        return redirect(url_for('turnier.turnier_details', turnier_id=turnier_id))
#
#    team = Team.query.get(team_id)
#    if team:
#        db.session.delete(team)
#        db.session.commit()
#        turnier, turnier_form, gruppen, gruppen_teams = lade_turnier_daten(turnier_id)
#        return render_template('turnier/turnier_details.html', turnier_form=turnier_form, turnier=turnier, gruppen=gruppen, gruppen_teams=gruppen_teams)
