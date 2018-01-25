# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create!(email: "email@example.com", password: "password1234")

CITIES = [
  {
    city: "Boston",
    state: "MA",
    user_id: User.first.id,
    description: "This is a city. It gets cold here during the winter."
  },
  {
    city: "Seattle",
    state: "WA",
    user_id: User.first.id,
    description: "This is also a city. It doesn't get so cold here."
  },
  {
    city: "Austin",
    state: "TX",
    user_id: User.first.id
  },
  {
    city: "Louisville",
    state: "KY",
    user_id: User.first.id,
    description: "literally everyone here likes whiskey."
  },
  {
    city: "Arlington",
    state: "VA",
    user_id: User.first.id
  },
  {
    city: "New York",
    state: "NY",
    user_id: User.first.id,
    description: "something someting empire state"
  },
  {
    city: "Detroit",
    state: "MI",
    user_id: User.first.id,
    description: "we used to have clean water . . . and jobs"
  },
  {
    city: "Boulder",
    state: "CO",
    user_id: User.first.id,
    description: "where people go to . . . boulder."
  }
]


CITIES.each do |city|
  City.create!(city_name: city[:city], state: city[:state], user_id: city[:user_id], description: city[:description])
end

35.times {
  city = City.find(id = rand(CITIES.length)+1)
  body = Faker::Lorem.paragraph
  Review.create!(city_id: city.id, user_id: User.first.id, body: "#{body}", comfort_index: rand(5)+1, weather_variance: rand(5)+1)
}
