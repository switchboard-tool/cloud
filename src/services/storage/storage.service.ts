import { Environment } from "../environments/environments.service";

const FLAG_AUTO_SIGN_IN = "switchboard:auto-sign-in";
const FLAG_LOCAL_ENVIRONMENTS = "switchboard:local-environments";

export class StorageService {
  resetLocalState() {
    this.setAutoSignIn(false);
    this.setLocalEnvironments(null);
  }

  getAutoSignIn(): boolean {
    const flag = localStorage.getItem(FLAG_AUTO_SIGN_IN);

    return storageStringToBoolean(flag);
  }

  setAutoSignIn(flag: boolean) {
    if (!flag) {
      localStorage.removeItem(FLAG_AUTO_SIGN_IN);
    } else {
      localStorage.setItem(FLAG_AUTO_SIGN_IN, "true");
    }
  }

  getLocalEnvironments(): Environment[] | null {
    const environmentsString = localStorage.getItem(FLAG_LOCAL_ENVIRONMENTS);

    return storageSstringToEnvironments(environmentsString);
  }

  setLocalEnvironments(environments: Environment[] | null) {
    if (environments === null) {
      localStorage.removeItem(FLAG_LOCAL_ENVIRONMENTS);
    } else {
      localStorage.setItem(FLAG_LOCAL_ENVIRONMENTS, JSON.stringify(environments));
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

function storageSstringToEnvironments(input: string | null): Environment[] | null {
  if (input === null) return null;

  try {
    const environments = JSON.parse(input);
    return environments;
  } catch (error) {
    console.error("error parsing storaged environments");
    return null;
  }
}
