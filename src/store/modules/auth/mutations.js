export default {
  login(state, data) {
    const username = data.username;
    const password = data.password;
    const users = data.users;
    state.isLoggedIn = users.some(
      (item) => item.password === password && item.key === username
    );
    console.log("Jel uradio loggedIn? ", state.isLoggedIn);
    if (state.isLoggedIn) {
      state.user = users.find(
        (item) => item.password === password && item.key === username
      );
    } else {
      state.user = null;
    }
  },
  register(state, data) {
    const username = data.username;
    const password = data.password;
    const user = {
      username: {
        password: password,
        username: username,
      },
    };
    fetch(
      "https://cakeshop-1641c-default-rtdb.europe-west1.firebasedatabase.app/users.json",
      {
        method: "POST",
        body: JSON.stringify(user),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Handle the data
        console.log("Dodat novi korisnik? ", data);
        state.user = user;
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  },
  setUser(state, user) {
    state.user = user;
  },
  setLoggedIn(state, isLoggedIn) {
    state.isLoggedIn = isLoggedIn;
  },
};
