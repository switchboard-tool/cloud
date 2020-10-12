const FLAG_AUTO_SIGN_IN = "switchboard:auto-sign-in";

export class StorageService {
  getAutoSignIn(): boolean {
    const flag = localStorage.getItem(FLAG_AUTO_SIGN_IN);

    return storageStringToBoolean(flag);
  }

  setAuthSignIn(flag: boolean) {
    if (!flag) {
      localStorage.removeItem(FLAG_AUTO_SIGN_IN);
    } else {
      localStorage.setItem(FLAG_AUTO_SIGN_IN, "true");
    }
  }
}

function storageStringToBoolean(input: string | null): boolean {
  if (input === null) return false;
  if (input === "true") return true;
  if (input === "false") return false;
  console.error(`${input} is neither true nor false, false is returned`);
  return false;
}
