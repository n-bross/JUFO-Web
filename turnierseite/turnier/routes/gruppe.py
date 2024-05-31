# turnierseite/turnier/routes/gruppe.py
from flask import Blueprint, render_template, request, redirect, url_for, flash
from turnierseite.turnier.models import Turnier, Gruppe, Team
from turnierseite.turnier.turnierForm import GruppeForm
from turnierseite.app import db
from turnierseite.turnier.routes.turnier import lade_turnier_daten

gruppe = Blueprint('gruppe', __name__, template_folder='../templates')

@gruppe.route('/gruppe_erstellen/<turnier_id>', methods=['GET', 'POST'])
def gruppe_erstellen(turnier_id):
    gruppe_form = GruppeForm()
    if request.method == 'GET':
        turnier, turnier_form, gruppen, gruppen_teams = lade_turnier_daten(turnier_id)
        return render_template("gruppe/gruppe_erstellen.html", turnier=turnier, turnier_form=turnier_form, gruppe_form=gruppe_form, gruppen=gruppen, gruppen_teams=gruppen_teams)
    elif request.method == 'POST':
        gruppe = Gruppe(turnierId=turnier_id, name=gruppe_form.name.data)
        db.session.add(gruppe)
        db.session.commit()
        turnier, turnier_form, gruppen, gruppen_teams = lade_turnier_daten(turnier_id)
        return render_template('turnier/turnier_details.html', turnier_form=turnier_form, turnier=turnier, gruppen=gruppen, gruppen_teams=gruppen_teams)

@gruppe.route('/gruppe_entfernen/<turnier_id>/<gruppe_id>')
def gruppe_entfernen(turnier_id, gruppe_id):
    teams = Team.query.filter(Team.gruppeId == gruppe_id).all()
    if teams:
        flash('es existieren noch Teams für die Gruppe')
        turnier, turnier_form, gruppen, gruppen_teams = lade_turnier_daten(turnier_id)
        return render_template('turnier/turnier_details.html', turnier_form=turnier_form, turnier=turnier, gruppen=gruppen, gruppen_teams=gruppen_teams)

    gruppe = Gruppe.query.get(gruppe_id)
    if gruppe:
        db.session.delete(gruppe)
        db.session.commit()
    else:
        flash(f"Gruppe mit id {gruppe_id} nicht gefunden.")
    turnier, turnier_form, gruppen, gruppen_teams = lade_turnier_daten(turnier_id)
    return render_template('turnier/turnier_details.html', turnier_form=turnier_form, turnier=turnier, gruppen=gruppen, gruppen_teams=gruppen_teams)
