
export class Emergency{

  /*
  Json data expected from server
   "emergencyid": 3,
   "status": 0,
   "emergency_lat": 21.1619,
   "emergency_lng": -86.8515,
   "emergency_address": null,
   "started_at": "2017-03-10T21:21:24.000Z",
   "ended_at": null
   */

  public emergencyid: number;
  public status: number;
  public emergency_lat: number;
  public emergency_lng: number;
  public emergency_address: string;
  public started_at: string;
  public ended_at: string;

}
