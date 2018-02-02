# README
![Build Status](https://codeship.com/projects/38ee3370-e1cd-0135-85bf-62c27b79889e/status?branch=master)
[![Code Climate](https://codeclimate.com/github/shanlon800/weather-review/badges/gpa.svg)](https://codeclimate.com/github/shanlon800/weather-review)
[![Coverage Status](https://coveralls.io/repos/github/shanlon800/weather-review/badge.svg?branch=master)](https://coveralls.io/github/shanlon800/weather-review?branch=master)


Weather Review App

The Weather Review App provides users a place to add reviews to cities based on the particular city's weather.  Users can leave a written review and must provide a rating on the overall comfortability of the weather as well as how much weather variance there is on a day to day, season to season basis.

Authors: A.J. Renna, Josh Hembree, Sergei Frunza, Anthony Cambece, and Sean Hanlon.

https://weather-review.herokuapp.com/

Technologies Used: Ruby on Rails, ReactJS, Postgres SQL, ActiveRecord, CSS, AWS S3, Devise, Capybara, Enzyme, Carrierwave and Fog.

Features:

* Users can create a new user and log in.

* A user can be designated as an admin.

* A new city can be added to be reviewed.

* A city can be deleted or edited, but only by the creator or by an admin.

* Reviews can be posted for each city.

* A review consists of a variability rating, a comfort index and an optional text description.

* A review can be deleted by the creator or by an admin.
