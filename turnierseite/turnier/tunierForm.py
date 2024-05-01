from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField, FloatField
from wtforms.validators import DataRequired

class BookForm(FlaskForm):
    autor = StringField(label='Autor', validators=[DataRequired()])
    titel = StringField(label='Titel', validators=[DataRequired()])
    genre = StringField(label='Genre')
    subgenreRomane = StringField(label='Subgenre Romane')
    format = StringField(label='Format')
    verlag = StringField(label='Verlag')
    laenge = StringField(label='Laenge')
    seiten = IntegerField(label='Seiten')
    isbn = StringField(label='ISBN')
    jahr = IntegerField(label='Jahr')
    preis = FloatField(label='Preis')
    standort = StringField(label='Standort')
    inhaltsangabe = StringField(label='Inhaltsangabe')
    bemerkungen = StringField(label='Bemerkungen')
    subtitel = StringField(label='Subtitel')
    subgenreSachbuchRatgeber = StringField(label='Subgenre Sachbuch/Ratgeber')
    subgenreRatgeber = StringField(label='Subgenre Ratgeber')
    auflage = IntegerField(label='Auflage')
    schlagw = StringField(label='Schlagw')
    bild = StringField(label='Bild')
    submit = SubmitField(label='Submit')
