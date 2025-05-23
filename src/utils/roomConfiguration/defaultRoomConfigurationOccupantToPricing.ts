import { RoomOccupancy, RoomPricingArrangement, RoomType } from "../../entities/Settings/Product/RoomConfiguration";


export function defaultRoomConfigurationOccupantToPricing(
  occupancy: RoomOccupancy,
  roomType?: RoomType,
): RoomPricingArrangement {

  // Implement the room configuration pricing rules based on occupancy
  const adultNum = occupancy.adultNum || 0;
  const childWithBedNum = occupancy.childWithBedNum || 0;
  const childWithoutBedNum = occupancy.childWithoutBedNum || 0;
  const infantNum = occupancy.infantNum || 0;

  // Initialize all values to 0
  let single = 0;
  let twin = 0;
  let triple = 0;
  let quad = 0;
  let childTwin = 0;
  let childWithBed = 0;

  // Set the appropriate room type based on roomType override or adult count
  // Only one room type should be non-zero
  if (roomType) {
    // Room type override - use specified room type regardless of adult count
    switch (roomType) {

      case RoomType.SINGLE:
        single = adultNum;
        break;
      case RoomType.TWIN:
        twin = adultNum;
        break;
      case RoomType.TRIPLE:
        triple = adultNum;
        break;
      case RoomType.QUADRUPLE:
        quad = adultNum;
        break;
      default:
        // This should never happen with the current enum values
        throw new Error(`Unsupported room type: ${roomType}`);

    }
  }

  // Default logic based on adult count (when no room type override)
  if (!roomType) {
    if (adultNum === 1) {
      single = 1;
    } else if (adultNum === 2) {
      twin = 2;
    } else if (adultNum === 3) {
      triple = 3;
    } else if (adultNum >= 4) {
      quad = 4;
    }
  }

  // Handle child with bed special case
  if (childWithBedNum > 0 && adultNum === 1) {
    // Only apply this special case when no room type override is specified
    single = 0;
    // When there's one adult and children with bed, adult will be in twin
    if (roomType) {
      switch (roomType) {

        case RoomType.SINGLE:
        case RoomType.TWIN:
          twin = 1;
          break;
        case RoomType.TRIPLE:
          triple = 1;
          break;
        case RoomType.QUADRUPLE:
          quad = 1;
          break;
        default:
          // This should never happen with the current enum values
          throw new Error(`Unsupported room type: ${roomType}`);

      }
    } else {
      twin = 1;
    }
    // When there's one adult and children with bed, use childTwin
    childTwin = 1;
    // In this case, childWithBed will be the remaining children with bed
    childWithBed = childWithBedNum > 1 ? childWithBedNum - 1 : 0;
  } else {
    // Normal case - all children with bed count as childWithBed
    childWithBed = childWithBedNum;
  }

  return {
    single: single,
    twin: twin,
    triple: triple,
    quad: quad,
    childTwin: childTwin,
    childWithBed: childWithBed,
    childNoBed: childWithoutBedNum,
    infant: infantNum,
  };
}
