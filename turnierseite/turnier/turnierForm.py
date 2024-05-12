from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField, FloatField,DateField
from wtforms.validators import DataRequired

class TurnierForm(FlaskForm):
    name = StringField(label='Name', validators=[DataRequired()])
    datumDerAustragung = DateField(label='Datum der Austragung', validators=[DataRequired()])
    submit = SubmitField(label="Anlegen")

class GruppeForm(FlaskForm):
    name = StringField(label='Name', validators=[DataRequired()])
    submit = SubmitField(label="Anlegen")

class TeamForm(FlaskForm):
    name = StringField(label='Name', validators=[DataRequired()])
    punkte = IntegerField(label='Punkte')
    treffer = IntegerField(label='Treffer')
    gegentreffer = IntegerField(label='Gegentreffer')
    submit = SubmitField(label="Anlegen")

class SpieleForm(FlaskForm):
    team1Id = IntegerField(label='Team 1 ID', validators=[DataRequired()])
    team2Id = IntegerField(label='Team 2 ID', validators=[DataRequired()])
    gespielt = StringField(label='Gespielt')
    runde = IntegerField(label='Runde')
    toreT1 = IntegerField(label='Tore Team 1')
    toreT2 = IntegerField(label='Tore Team 2')
    submit = SubmitField(label="Anlegen")
