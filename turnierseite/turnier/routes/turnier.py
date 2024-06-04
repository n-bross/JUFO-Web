# turnierseite/turnier/routes/turnier.py
from flask import Blueprint, render_template, request, redirect, url_for, flash
from flask_login import login_required
from turnierseite.turnier.models import Turnier, Gruppe, Team
from turnierseite.turnier.turnierForm import TurnierForm
from turnierseite.app import db

turnier = Blueprint('turnier', __name__, template_folder='../templates')

def lade_turnier_daten(turnier_id):
    turnier = Turnier.query.filter(Turnier.id == turnier_id).first()
    turnier_form = TurnierForm(obj=turnier)
    gruppen = Gruppe.query.filter(Gruppe.turnierId == turnier_id).all()

    gruppen_teams = {}
    for gruppe in gruppen:
        teams = Team.query.filter(Team.gruppeId == gruppe.id).order_by(Team.punkte.desc()).all()
        gruppen_teams[gruppe.id] = teams

    return turnier, turnier_form, gruppen, gruppen_teams

@turnier.route('/')
@login_required
def index():
    alle_turniere = Turnier.query.all()
    return render_template("turnier/turnier_overview.html", alle_turniere=alle_turniere)

@turnier.route('/turnier_erstellen', methods=['GET', 'POST'])
@login_required
def turnier_erstellen():
    turnier_form = TurnierForm()
    if request.method == 'GET':
        return render_template("turnier/turnier_erstellen.html", form=turnier_form)
    elif request.method == 'POST':
        turnier = Turnier(name=turnier_form.name.data, datumDerAustragung=turnier_form.datumDerAustragung.data)
        db.session.add(turnier)
        db.session.commit()
        return redirect(url_for('turnier.index'))

@turnier.route('/turnier_entfernen/<turnier_id>')
@login_required
def turnier_entfernen(turnier_id):
    gruppen = Gruppe.query.filter(Gruppe.turnierId == turnier_id).all()
    if gruppen:
        flash('es existieren noch Gruppen für das Turnier')
        return redirect(url_for('turnier.turnier_details', turnier_id=turnier_id))
    turnier = Turnier.query.filter(Turnier.id == turnier_id).first()
    if turnier:
        db.session.delete(turnier)
        db.session.commit()
        return redirect(url_for('turnier.index'))

@turnier.route('/turnier_details/<turnier_id>', methods=['GET', 'POST'])
@login_required
def turnier_details(turnier_id):
    turnier, turnier_form, gruppen, gruppen_teams = lade_turnier_daten(turnier_id)
    if request.method == 'POST':
        turnier = Turnier.query.get(turnier_id)
        if turnier_form.validate_on_submit():
            turnier.name = turnier_form.name.data
            turnier.datumDerAustragung = turnier_form.datumDerAustragung.data
            db.session.add(turnier)
            db.session.commit()
    return render_template('turnier/turnier_details.html', turnier_form=turnier_form, turnier=turnier, gruppen=gruppen, gruppen_teams=gruppen_teams)
