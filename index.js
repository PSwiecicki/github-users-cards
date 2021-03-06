let page = 0;

const getUser = async () => {
    button.disabled = true;
    return await fetch(`https://api.github.com/users?since=${page}&per_page=1`)
    .then((response) => response.json())
    .then((data) => fetch(`https://api.github.com/users/${data[0].login}`))
    .then((response) => response.json())
    .then(({login, name, avatar_url, followers, following}) => {
      page++;
      return {
        login,
        name,
        followers,
        following,
        avatarURL: avatar_url,
      }
    })
    .catch(() => {
      button.disabled = false;
    })
  };

const container = document.querySelector('.container');
const button = document.querySelector('button');

const addCard = () => getUser().then((user) => {
    const newElement = document.createElement('div');
    newElement.classList.add('user');
    newElement.innerHTML = `<img class="avatar" src="${user.avatarURL}" alt="User avatar"/>
    <div class="personals">
      <p class="name">${user.name ? user.name : 'Unknown'}</p>
      <p class="user-name">${user.login}</p>
    </div>
    <div class="folows">
      <p>Folowers: ${user.followers}</p>
      <p>Folowing: ${user.following}</p>
    </div>`;
    container.append(newElement);
    button.disabled = false;
  }
);
