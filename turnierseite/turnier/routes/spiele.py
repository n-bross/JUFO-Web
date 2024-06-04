# turnierseite/turnier/routes/spiele.py
from flask import Blueprint, render_template, flash, redirect, url_for, request
from flask_login import login_required

import random

from turnierseite.turnier.models import Turnier, Gruppe, Team, Spiele
from turnierseite.turnier.turnierForm import SpieleForm
from turnierseite.turnier.routes.turnier import lade_turnier_daten
from turnierseite.app import db

spiele = Blueprint('spiele', __name__, template_folder='../templates')

@spiele.route('/spiele_erstellen/<turnier_id>/<gruppe_id>')
@login_required
def spiele_erstellen(turnier_id, gruppe_id):
    team = Team.query.filter(Team.gruppeId == gruppe_id).first()
    if not team:
        flash('Es existieren keine Teams für die Gruppe')
        return redirect(url_for('turnier.turnier_details', turnier_id=turnier_id))

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
@login_required
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

#spiel löschen, wenn noch nicht gespielt wurde
@spiele.route('/spiele_loeschen/<turnier_id>/<gruppe_id>')
@login_required
def spiele_loeschen(turnier_id, gruppe_id):
    gespielte_spiele = Spiele.query.filter(Spiele.gruppeId == gruppe_id, Spiele.gespielt == 1).all()
    if gespielte_spiele:
        flash('es existieren Bereits gespielte Spiele')
        return redirect(url_for('turnier.turnier_details', turnier_id=turnier_id))

    spiele = Spiele.query.filter(Spiele.gruppeId == gruppe_id).all()
    if spiele:
        for spiel in spiele:
            db.session.delete(spiel)
        db.session.commit()
        flash(f'Die spiele für die Gruppe: {gruppe_id} wurden gelöscht')

    turnier, turnier_form, gruppen, gruppen_teams = lade_turnier_daten(turnier_id)
    return render_template('turnier/turnier_details.html', turnier_form=turnier_form, turnier=turnier, gruppen=gruppen, gruppen_teams=gruppen_teams)

# Route to enter game results
@spiele.route('/spiele_eintragen/<turnier_id>/<gruppe_id>/<spiele_id>', methods=['GET', 'POST'])
@login_required
def spiele_eintragen(turnier_id, gruppe_id, spiele_id):
    spiel = Spiele.query.filter(Spiele.id == spiele_id).first()
    spiel_form = SpieleForm(obj=spiel)

    if request.method == 'GET':
        turnier, turnier_form, gruppen, gruppen_teams = lade_turnier_daten(turnier_id)
        return render_template("spiele/spiele_eintragen.html", turnier=turnier,spiel=spiel, spiel_form=spiel_form)

    elif request.method == 'POST':
        if not spiel_form.validate_on_submit():
            flash('Ungültige Eingabe')
            return redirect(url_for('spiele.spiele_eintragen', turnier_id=turnier_id, gruppe_id=gruppe_id, spiele_id=spiele_id))

        # Validate score inputs
        if spiel_form.toreT1.data < 0 or spiel_form.toreT2.data < 0:
            flash('Ungültige Tor eingabe')
            return redirect(url_for('spiele.spiele_overview', turnier_id=turnier_id))

        # Load teams
        team1 = Team.query.get(spiel.team1Id)
        team2 = Team.query.get(spiel.team2Id)

        print(f"spiel.gespielt:{spiel.gespielt}")
        if spiel.gespielt == '1':
            reset_gespieltes_spiel(team1, team2, spiel.toreT1, spiel.toreT2)
        else:
            spiel.gespielt = 1

        # Update game scores
        spiel.toreT1 = spiel_form.toreT1.data
        spiel.toreT2 = spiel_form.toreT2.data

        # Adjust points based on the new scores
        if spiel.toreT1 > spiel.toreT2:
            anpasung_punkte(team1, team2, 3, 0)
        elif spiel.toreT1 < spiel.toreT2:
            anpasung_punkte(team1, team2, 0, 3)
        else:
            anpasung_punkte(team1, team2, 1, 1)

        # Update teams' scores
        team1.treffer += spiel.toreT1
        team1.gegentreffer += spiel.toreT2
        team2.treffer += spiel.toreT2
        team2.gegentreffer += spiel.toreT1

        # Commit changes to the database
        db.session.add(team1)
        db.session.add(team2)
        db.session.add(spiel)
        db.session.commit()

        flash('Spielergebnis erfolgreich eingetragen')
        return redirect(url_for('spiele.spiele_overview', turnier_id=turnier_id))


# Route to enter game results
@spiele.route('/spiel_ergebnis_loeschen/<turnier_id>/<gruppe_id>/<spiele_id>', methods=['GET', 'POST'])
@login_required
def spiel_ergebnis_loeschen(turnier_id, gruppe_id, spiele_id):
    spiel = Spiele.query.filter(Spiele.id == spiele_id).first()
    # Load teams
    team1 = Team.query.get(spiel.team1Id)
    team2 = Team.query.get(spiel.team2Id)

    if spiel.gespielt == '1':
        spiel.gespielt = '0'
        reset_gespieltes_spiel(team1, team2, spiel.toreT1, spiel.toreT2)

    return redirect(url_for('spiele.spiele_overview', turnier_id=turnier_id))

# Function to reset a played game's impact on teams
def reset_gespieltes_spiel(team1, team2, alt_toreT1, alt_toreT2):
    if alt_toreT1 > alt_toreT2:
        anpasung_punkte(team1, team2, -3, 0)
    elif alt_toreT1 < alt_toreT2:
        anpasung_punkte(team1, team2, 0, -3)
    else:
        anpasung_punkte(team1, team2, -1, -1)

    team1.treffer -= alt_toreT1
    team1.gegentreffer -= alt_toreT2
    team2.treffer -= alt_toreT2
    team2.gegentreffer -= alt_toreT1

    db.session.add(team1)
    db.session.add(team2)
    db.session.commit()

# Function to adjust points between two teams
def anpasung_punkte(team1, team2, points1, points2):
    team1.punkte += points1
    team2.punkte += points2
