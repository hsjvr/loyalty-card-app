export function deleteLoyaltyCard(loyaltyCard) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let loyaltyCards = readLocalStorage('loyaltyCards');

      if (!loyaltyCards) {
        loyaltyCards = [];
      }

      const index = loyaltyCards.indexOf(loyaltyCards.find((x) => x.id === loyaltyCard.id));

      loyaltyCards.splice(index, 1);

      writeLocalStorage('loyaltyCards', loyaltyCards);

      resolve();
    }, 2000);
  });
}

export function getLoyaltyCards() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const loyaltyCards = readLocalStorage('loyaltyCards');

      resolve(loyaltyCards ? loyaltyCards : []);
    }, 2000);
  });
}

export function getUsers() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          firstName: 'Desmond',
          lastName: 'Murray',
          numberOfLoyaltyCards: Math.floor(Math.random() * 7) + 1,
        },
        {
          firstName: 'Aylin',
          lastName: 'Leonard',
          numberOfLoyaltyCards: Math.floor(Math.random() * 7) + 1,
        },
        {
          firstName: 'Harrison',
          lastName: 'Ellis',
          numberOfLoyaltyCards: Math.floor(Math.random() * 7) + 1,
        },
        {
          firstName: 'Octavio',
          lastName: 'Gilmore',
          numberOfLoyaltyCards: Math.floor(Math.random() * 7) + 1,
        },
        {
          firstName: 'Ean',
          lastName: 'Reese',
          numberOfLoyaltyCards: Math.floor(Math.random() * 7) + 1,
        },
      ]);
    }, 2000);
  });
}

export function postLoyaltyCard(code, latitude, longitude, accuracy) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let loyaltyCards = readLocalStorage('loyaltyCards');

      if (!loyaltyCards) {
        loyaltyCards = [];
      }

      loyaltyCards.push({
        id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
        date: new Date(),
      });

      writeLocalStorage('loyaltyCards', loyaltyCards);

      resolve();
    }, 2000);
  });
}

function readLocalStorage(key) {
  const json = localStorage.getItem(key);

  if (!json) {
    return null;
  }

  return JSON.parse(json);
}

function writeLocalStorage(key, value) {
  if (!value) {
    localStorage.removeItem(key);
  }

  localStorage.setItem(key, JSON.stringify(value));
}
