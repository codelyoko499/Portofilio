let users = [
  {
    fname: "Moshe",
    lname: "David",
    email: "moshe@email.com",
    password: "Qaz123!qaz",
    isLogedIn: false,
  },
  {
    fname: "David",
    lname: "Joe",
    email: "joe@email.com",
    password: "123321123",
    isLogedIn: false,
  },
  {
    fname: "Moe",
    lname: "Jone",
    email: "jone@email.com",
    password: "abc123Cxa",
    isLogedIn: false,
  },
];

for (let user of users) {
  for (let key in user) {
    console.log(user[key]);
  }
}
