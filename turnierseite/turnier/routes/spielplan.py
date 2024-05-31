# turnierseite/turnier/routes/spielplan.py
from flask import Blueprint, render_template, flash

import random

from turnierseite.turnier.models import Turnier, Gruppe, Team, Spiele
from turnierseite.turnier.routes.turnier import lade_turnier_daten
from turnierseite.app import db

spielplan = Blueprint('spielplan', __name__, template_folder='../templates')

@spielplan.route('/spielplan_erstellen/<turnier_id>/<gruppe_id>')
def spielplan_erstellen(turnier_id, gruppe_id):
    team = Team.query.filter(Team.gruppeId == gruppe_id).first()
    spiele = Spiele.query.filter(Spiele.team1Id == team.id).all()
    if spiele:
        flash('es existieren bereits Spiele für die Gruppe')
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
    turnier, turnier_form, gruppen, gruppen_teams = lade_turnier_daten(turnier_id)
    return render_template('turnier/turnier_details.html', turnier_form=turnier_form, turnier=turnier, gruppen=gruppen, gruppen_teams=gruppen_teams)
