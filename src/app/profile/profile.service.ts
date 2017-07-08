import {Injectable} from '@angular/core';
import {PROFILES} from "./profile.data";
import {Profile} from "./profile.model";

@Injectable()
export class ProfileService {

  constructor() {
  }

  getProfiles() {
    return PROFILES;
  }

  deleteProfile(profile:Profile) {
    let profile_idx = PROFILES.indexOf(profile);
    PROFILES.splice(profile_idx, 1);
  }

  saveProfile(cities:string[]) {
    let profileName = 'Profile ' + (PROFILES.length + 1);
    let profile = new Profile(profileName, cities);
    PROFILES.push(profile);
  }

}
