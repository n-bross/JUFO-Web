from flask import render_template, Blueprint, session, flash
from flask_login import current_user
from sqlalchemy import text
import datetime

from turnierseite.app import db

from turnierseite.turnier.models import Turnier, Gruppe, Team, Spiele


core = Blueprint('core', __name__, template_folder='templates')

@core.route('/')
def index():
    #alle_turniere = Turnier.query.all()
    turniere = Turnier.query.order_by(Turnier.datumDerAustragung.desc()).all()
    return render_template('core/index.html', alle_turniere=turniere)

#@core.route('/scoreboard/<turnier_id>')
#def scoreboard(turnier_id):
#    gruppen = Gruppe.query.filter(Gruppe.turnierId == turnier_id).all()
#    if not gruppen:
#        flash('es existieren keine Gruppen für das Turnier')
#
#        turniere = Turnier.query.order_by(Turnier.datumDerAustragung.desc()).all()
#        return render_template('core/index.html', alle_turniere=turniere)
#
#    # Create a dictionary to hold teams for each group, ordered by punkte
#    gruppen_teams = {}
#    gruppen_spiele = {}
#    for gruppe in gruppen:
#        teams = Team.query.filter(Team.gruppeId == gruppe.id).order_by(Team.punkte.desc()).all()
#        if not teams:
#            flash('es existieren keine Teams für die Gruppe {gruppe.name}')
#
#            turniere = Turnier.query.order_by(Turnier.datumDerAustragung.desc()).all()
#            return render_template('core/index.html', alle_turniere=turniere)
#
#        gruppen_teams[gruppe.id] = teams
#
#        max_runde = Spiele.query.filter(Spiele.gruppeId == gruppe.id).order_by(Spiele.runde.desc()).first()
#
#        if not max_runde:
#            flash('es existieren keine Spiele für die Gruppe  {gruppe.name}')
#
#            turniere = Turnier.query.order_by(Turnier.datumDerAustragung.desc()).all()
#            return render_template('core/index.html', alle_turniere=turniere)
#
#        max_runde = max_runde.runde
#
#        spiele = Spiele.query.filter(Spiele.gruppeId == gruppe.id).order_by(Spiele.runde.asc()).all()
#        alle_runden = {}
#        for i in range (1, max_runde+1):
#            alle_runden[i] = []
#
#
#        for spiel in spiele:
#            alle_runden[spiel.runde].append(spiel)
#
#        gruppen_spiele[gruppe.id] = alle_runden
#
#    turnier = Turnier.query.filter(Turnier.id == turnier_id).first()
#    return render_template('tabelle/tabelle.html', turnier=turnier, gruppen=gruppen, gruppen_teams=gruppen_teams, gruppen_spiele=gruppen_spiele)

@core.route('/gruppen_des_turnieres/<turnier_id>')
def gruppen_des_turnieres(turnier_id):
    gruppen = Gruppe.query.filter(Gruppe.turnierId == turnier_id).all()
    if not gruppen:
        flash('es existieren keine Gruppen für das Turnier')

        turniere = Turnier.query.order_by(Turnier.datumDerAustragung.desc()).all()
        return render_template('core/index.html', alle_turniere=turniere)

    turnier = Turnier.query.filter(Turnier.id == turnier_id).first()
    return render_template('tabelle/gruppen_des_turnieres.html', turnier=turnier, gruppen=gruppen)

@core.route('/tabelle_einer_gruppe/<turnier_id>/<gruppe_id>')
def tabelle_einer_gruppe(turnier_id, gruppe_id):
    gruppe = Gruppe.query.filter(Gruppe.id == gruppe_id).first()
    if not gruppe:
        flash('es existieren keine Gruppen für das Turnier')

        turniere = Turnier.query.order_by(Turnier.datumDerAustragung.desc()).all()
        return render_template('core/index.html', alle_turniere=turniere)

    teams = Team.query.filter(Team.gruppeId == gruppe_id).order_by(Team.punkte.desc()).all()
    if not teams:
        flash('es existieren keine Teams für die Gruppe {gruppe.name}')

        turniere = Turnier.query.order_by(Turnier.datumDerAustragung.desc()).all()
        return render_template('core/index.html', alle_turniere=turniere)

    alle_runden = spiele_einer_gruppe(gruppe_id=gruppe_id)

    turnier = Turnier.query.filter(Turnier.id == turnier_id).first()
    return render_template('tabelle/tabelle_einer_gruppe.html', turnier=turnier, gruppe=gruppe,teams=teams, alle_runden=alle_runden)


@core.route('/spielplan_einer_runde/<turnier_id>/<gruppe_id>/<runde>')
def spielplan_einer_runde(turnier_id, gruppe_id, runde):
    gruppen = Gruppe.query.filter(Gruppe.turnierId == turnier_id).all()
    if not gruppen:
        flash('es existieren keine Gruppen für das Turnier')

        turniere = Turnier.query.order_by(Turnier.datumDerAustragung.desc()).all()
        return render_template('core/index.html', alle_turniere=turniere)

    teams = Team.query.filter(Team.gruppeId == gruppe_id).order_by(Team.punkte.desc()).all()
    if not teams:
            flash('es existieren keine Teams für die Gruppe {gruppe.name}')

            turniere = Turnier.query.order_by(Turnier.datumDerAustragung.desc()).all()
            return render_template('core/index.html', alle_turniere=turniere)

    alle_runden = spiele_einer_gruppe(gruppe_id=gruppe_id)

    turnier = Turnier.query.filter(Turnier.id == turnier_id).first()
    gruppe = Gruppe.query.filter(Gruppe.id == gruppe_id).first()
    return render_template('tabelle/spielplan_einer_runde.html', turnier=turnier, gruppe=gruppe, alle_runden=alle_runden, runde=runde)

def spiele_einer_gruppe(gruppe_id):
    max_runde = Spiele.query.filter(Spiele.gruppeId == gruppe_id).order_by(Spiele.runde.desc()).first()

    if not max_runde:
        flash('es existieren keine Spiele für die Gruppe  {gruppe.name}')

        turniere = Turnier.query.order_by(Turnier.datumDerAustragung.desc()).all()
        return render_template('core/index.html', alle_turniere=turniere)

    max_runde = max_runde.runde

    spiele = Spiele.query.filter(Spiele.gruppeId == gruppe_id).order_by(Spiele.runde.asc()).all()
    alle_runden = {}
    for i in range (1, max_runde+1):
        alle_runden[i] = []

    for spiel in spiele:
        alle_runden[spiel.runde].append(spiel)

    return alle_runden