import {
  Client,
  Status,
  AddressType,
} from "@googlemaps/google-maps-services-js";
import config from "./config";
interface Address {
  formattedAddress?: string;
  streetAddress?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  lat?: number;
  lng?: number;
  country?: string;
}

async function geocodeAddress(address: string) {
  const client = new Client({});
  const parsedAddress: Address = {};

  return client
    .geocode({
      params: {
        address: address,
        key: config.GOOGLE_MAPS_API_KEY,
        region: "us",
      },
      timeout: 1000, // milliseconds
    })
    .then((result) => {
      try {
        if (result.data.status === Status.OK) {
          if (
            !result.data.results[0].types.includes(AddressType.street_address)
          ) {
            throw Error("Invalid Address");
          }
          parsedAddress.formattedAddress =
            result.data.results[0].formatted_address;
          parsedAddress.streetAddress = result.data.results[0].formatted_address.split(
            ","
          )[0];

          parsedAddress.lat = result.data.results[0].geometry.location.lat;
          parsedAddress.lng = result.data.results[0].geometry.location.lng;
          result.data.results[0].address_components.forEach((component) => {
            if (component.types.includes(AddressType.country)) {
              parsedAddress.country = component.short_name;
            }
            if (component.types.includes(AddressType.postal_code)) {
              parsedAddress.zipCode = component.short_name;
            }
            if (
              component.types.includes(AddressType.administrative_area_level_1)
            ) {
              parsedAddress.state = component.short_name;
            }
            if (
              component.types.includes(
                AddressType.locality || AddressType.sublocality_level_1
              )
            ) {
              parsedAddress.city = component.short_name;
            }
          });
        } else {
          throw "Error While Parsing Address";
        }
      } catch (error) {
        throw Error("Invalid Street Address");
      }
      return parsedAddress;
    });
}

export { geocodeAddress, Address };
