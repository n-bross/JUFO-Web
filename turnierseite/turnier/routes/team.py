# turnierseite/turnier/routes/team.py
from flask import Blueprint, render_template, request, flash, redirect, url_for
from flask_login import login_required
from turnierseite.turnier.models import Turnier, Gruppe, Team, Spiele
from turnierseite.turnier.turnierForm import TeamForm
from turnierseite.app import db
from turnierseite.turnier.routes.turnier import lade_turnier_daten

team = Blueprint('team', __name__, template_folder='../templates')

@team.route('/team_erstellen/<turnier_id>', methods=['GET', 'POST'])
@login_required
def team_erstellen(turnier_id):
    team_form = TeamForm()
    if request.method == 'GET':
        turnier, turnier_form, gruppen, gruppen_teams = lade_turnier_daten(turnier_id)
        return render_template("team/team_erstellen.html", turnier=turnier, turnier_form=turnier_form, team_form=team_form, gruppen=gruppen, gruppen_teams=gruppen_teams)
    elif request.method == 'POST':
        gruppen_in_turnier = [gruppe.id for gruppe in Gruppe.query.filter(Gruppe.turnierId == turnier_id).all()]
        if int(team_form.gruppe.data) in gruppen_in_turnier:
            team = Team(gruppeId=team_form.gruppe.data, name=team_form.name.data, punkte=0, treffer=0, gegentreffer=0)
            db.session.add(team)
            db.session.commit()
        else:
            flash(f"Die Ausgewählte Gruppe existiert nicht.")
            return redirect(url_for('turnier.turnier_details', turnier_id=turnier_id))
        turnier, turnier_form, gruppen, gruppen_teams = lade_turnier_daten(turnier_id)
        return render_template('turnier/turnier_details.html', turnier_form=turnier_form, turnier=turnier, gruppen=gruppen, gruppen_teams=gruppen_teams)

@team.route('/team_entfernen/<turnier_id>/<team_id>')
@login_required
def team_entfernen(turnier_id, team_id):
    spiele = Spiele.query.filter(Spiele.team1Id == team_id).all()
    if spiele:
        flash('Es existieren noch Spiele für das Team')
        return redirect(url_for('turnier.turnier_details', turnier_id=turnier_id))

    team = Team.query.get(team_id)
    if team:
        db.session.delete(team)
        db.session.commit()
        turnier, turnier_form, gruppen, gruppen_teams = lade_turnier_daten(turnier_id)
        return render_template('turnier/turnier_details.html', turnier_form=turnier_form, turnier=turnier, gruppen=gruppen, gruppen_teams=gruppen_teams)
