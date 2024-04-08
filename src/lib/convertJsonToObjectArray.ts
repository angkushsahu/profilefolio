import type { UserProfileSelectType } from "~/server/db/getSchema";

export default function jsonToObjArray(userProfile: UserProfileSelectType): UserProfileSelectType {
   const updatedProfile = userProfile;
   if (updatedProfile.websiteLinks) {
      const updatedWebsiteLinksObj = updatedProfile.websiteLinks;
      const updatedWebsiteLinks = Object.entries(updatedWebsiteLinksObj).map(([key, value]: Array<string>) => ({ key, value }));
      updatedProfile.websiteLinks = updatedWebsiteLinks;
   }

   return updatedProfile;
}
