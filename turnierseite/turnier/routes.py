from flask import render_template, request, Blueprint, url_for, redirect
from flask_login import current_user
from sqlalchemy import text

import datetime

from turnierseite.turnier.models import Turnier, Gruppe, Team, Spiele
from turnierseite.turnier.turnierForm import TurnierForm, GruppeForm, TeamForm, SpieleForm

from turnierseite.app import db


turnier = Blueprint('turnier', __name__, template_folder='templates')


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


@turnier.route('/turnier_details/<id>', methods=['GET', 'POST'])
def turnier_details(id):
    turnier = Turnier.query.filter(Turnier.id == id).first()
    turnier_form= TurnierForm(obj=turnier)

    gruppen = Gruppe.query.filter(Gruppe.turnierId == id)

    return render_template('turnier/turnier_details.html', form=turnier_form, turnier=turnier)


@turnier.route('/gruppe_erstellen/<turnier_id>', methods=['GET', 'POST'])
def gruppe_erstellen(turnier_id):
    gruppe_form = GruppeForm()
    if request.method == 'GET':
        return render_template("gruppe/gruppe_erstellen.html", form=gruppe_form, turnier_id=turnier_id)
    elif request.method == 'POST':
        #insert des neuen Turnieres in die Datenbank
        gruppe = Gruppe(name=gruppe_form.name.data, turnierId=id)
        db.session.add(gruppe)
        db.session.commit()

        #laden eines neuen html
        return redirect(url_for('turnier.index'))