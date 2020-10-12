import { Environment } from "../environments/environments.service";

const FLAG_AUTO_SIGN_IN = "switchboard:auto-sign-in";
const FLAG_ENVIRONMENTS = "switchboard:environments";
const FLAG_ENVIRONMENTS_LAST_MODIFIED = "switchboard:environments-last-modified";

export class StorageService {
  resetLocalState() {
    localStorage.clear();
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

  getEnvironments(): Environment[] | null {
    const environmentsString = localStorage.getItem(FLAG_ENVIRONMENTS);

    return storageStringToEnvironments(environmentsString);
  }

  setEnvironments(environments: Environment[] | null) {
    if (environments === null) {
      localStorage.removeItem(FLAG_ENVIRONMENTS);
    } else {
      localStorage.setItem(FLAG_ENVIRONMENTS, JSON.stringify(environments));
    }
  }

  getEnvironmentsLastModified(): string | null {
    const timestampString = localStorage.getItem(FLAG_ENVIRONMENTS_LAST_MODIFIED);
    return timestampString;
  }

  setEnvironmentsLastModified(timestamp: string | null) {
    if (timestamp === null) {
      localStorage.remove(FLAG_ENVIRONMENTS_LAST_MODIFIED);
    } else {
      localStorage.setItem(FLAG_ENVIRONMENTS_LAST_MODIFIED, timestamp);
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

function storageStringToEnvironments(input: string | null): Environment[] | null {
  if (input === null) return null;

  try {
    const environments = JSON.parse(input);
    return environments;
  } catch (error) {
    console.error("error parsing storaged environments");
    return null;
  }
}
