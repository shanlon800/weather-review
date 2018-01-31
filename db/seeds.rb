# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create!(email: "josh@launchacademy.com", password: "password1234")
User.create!(email: "anthony@launchacademy.com", password: "password1234")
User.create!(email: "sean@launchacademy.com", password: "password1234")
User.create!(email: "aj@launchacademy.com", password: "password1234")
User.create!(email: "sergei@launchacademy.com", password: "password1234")

CITIES = [
  {
    city: "Boston",
    state: "MA",
    description: "This is a city. It gets cold here during the winter."
  },
  {
    city: "Seattle",
    state: "WA",
    description: "This is also a city. It doesn't get so cold here."
  },
  {
    city: "Austin",
    state: "TX"
  },
  {
    city: "Louisville",
    state: "KY",
    description: "Believe it or not, it actually snows here sometimes."
  },
  {
    city: "Arlington",
    state: "VA",
  },
  {
    city: "New York",
    state: "NY",
    description: "something someting empire state"
  },
  {
    city: "Detroit",
    state: "MI",
    description: "Have you SEEN that river? "
  },
  {
    city: "Boulder",
    state: "CO",
    description: "where people go to . . . boulder."
  },
  {
    city: "Arlington",
    state: "TX",
  },
  {
    city: "Orlando",
    state: "FL",
    description: "Where Florida Man lives."
  },
  {
    city: "Racine",
    state: "WI",
    description: "Cows."
  },
  {
    city: "Nashua",
    state: "NH"
  }
]

CITIES.each do |city|
  City.create!(city_name: city[:city], state: city[:state], user_id: User.order("RANDOM()").first.id, description: city[:description])
end

45.times {
  city = City.find(id = rand(CITIES.length)+1)
  body = Faker::Lorem.paragraph
  Review.create!(city_id: city.id, user_id: User.order("RANDOM()").first.id, body: "#{body}", comfort_index: rand(5)+1, weather_variance: rand(5)+1)
}

# 100.times {
#
# }
