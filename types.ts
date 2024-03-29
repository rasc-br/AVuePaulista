export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

export enum GameMode {
  intro,
  game,
  end,
}

export enum IntroMode {
  legacy,
  new,
  done,
}
