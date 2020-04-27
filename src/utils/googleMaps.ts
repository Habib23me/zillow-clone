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

interface Boundaries {
  northeast: {
    lat: number;
    lng: number;
  };
  southwest: {
    lat: number;
    lng: number;
  };
}

//Geocode and address string to an Address Interface
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
      if (result.data.status === Status.OK) {
        if (
          !(
            result.data.results[0].types.includes(AddressType.street_address) ||
            result.data.results[0].types.includes(AddressType.premise) ||
            result.data.results[0].types.includes(AddressType.subpremise)
          )
        ) {
          throw Error("Address Not a Valid Building");
        }
        try {
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
        } catch (error) {
          throw Error("Error Parsing Address");
        }
      } else {
        throw "Error Retrieving Address Info";
      }

      return parsedAddress;
    });
}

//Geocode and address string to it's Boundaries
async function geocodeAddressToBoundaries(
  address: string
): Promise<Boundaries> {
  const client = new Client({});

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
      if (result.data.status === Status.OK) {
        try {
          return result.data.results[0].geometry.viewport;
        } catch (error) {
          throw Error("Error Parsing Address");
        }
      } else {
        throw "Error Retrieving Address Info";
      }
    });
}

export { geocodeAddress, geocodeAddressToBoundaries, Address };
