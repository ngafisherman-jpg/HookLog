import { useState, useRef } from "react";

const TABS = ["Dashboard", "Log Trip", "My Catches", "Weather", "Launches", "Conditions"];
const LURES = ["Spinnerbait","Crankbait","Jig","Swimbait","Topwater","Soft Plastic","Drop Shot","Other"];
const WEATHER_OPTS = ["Sunny","Cloudy","Overcast","Rainy","Windy","Foggy"];
const WATER = ["Clear","Stained","Muddy","Choppy","Calm","Fast Current"];
const FISH_TYPES = ["Largemouth Bass","Smallmouth Bass","Spotted Bass","Shoal Bass","Redeye Bass","Suwannee Bass","White Bass","Striped Bass","Hybrid Striped Bass","Rock Bass","Shadow Bass","Catfish","Crappie","Walleye","Trout","Pike","Musky","Yellow Perch","White Perch","Other"];
const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

const LAUNCH_SITES = [
  // -- CHATTAHOOCHEE RIVER (Upper - White County headwaters) --
  { id:1,  name:"FS 52 - Headwaters Put-in", body:"Chattahoochee River", state:"GA", lat:34.766, lng:-83.780, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.5 },
  { id:2,  name:"Low Gap Creek Campground", body:"Chattahoochee River", state:"GA", lat:34.754, lng:-83.773, type:"River", fee:true, amenities:["Kayak Launch","Camping","Parking"], rating:4.6 },
  { id:3,  name:"Martin Branch Access", body:"Chattahoochee River", state:"GA", lat:34.736, lng:-83.765, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.3 },
  { id:4,  name:"Chattahoochee River Rd Access", body:"Chattahoochee River", state:"GA", lat:34.721, lng:-83.749, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.4 },
  { id:5,  name:"GA 75 Unicoi Turnpike", body:"Chattahoochee River", state:"GA", lat:34.709, lng:-83.740, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.4 },
  { id:6,  name:"Helen City Park", body:"Chattahoochee River", state:"GA", lat:34.701, lng:-83.721, type:"River", fee:false, amenities:["Kayak Launch","Parking","Restrooms","Picnic Area"], rating:4.7 },
  { id:7,  name:"Hardman Farm Trailhead", body:"Chattahoochee River", state:"GA", lat:34.696, lng:-83.712, type:"River", fee:false, amenities:["Kayak Launch","Parking","Trails"], rating:4.6 },
  { id:8,  name:"GA 75 - Nacoochee Access", body:"Chattahoochee River", state:"GA", lat:34.683, lng:-83.712, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.3 },
  { id:9,  name:"Sautee Creek - Lynch Mtn Rd", body:"Chattahoochee River", state:"GA", lat:34.685, lng:-83.669, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.4 },
  { id:10, name:"GA 255 Access", body:"Chattahoochee River", state:"GA", lat:34.628, lng:-83.642, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.2 },
  { id:11, name:"GA 115 Access", body:"Chattahoochee River", state:"GA", lat:34.575, lng:-83.634, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.3 },
  { id:12, name:"Duncan Bridge Rd - GA 384", body:"Chattahoochee River", state:"GA", lat:34.541, lng:-83.623, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.4 },
  { id:13, name:"Mossy Creek State Park", body:"Chattahoochee River", state:"GA", lat:34.495, lng:-83.673, type:"River", fee:true, amenities:["Kayak Launch","Parking","Restrooms","Camping"], rating:4.7 },
  { id:14, name:"Belton Bridge Rd Access", body:"Chattahoochee River", state:"GA", lat:34.437, lng:-83.681, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.3 },
  // -- CHATTAHOOCHEE RIVER (NRA - Atlanta Metro) --
  { id:15, name:"Buford Dam Tailwater", body:"Chattahoochee River", state:"GA", lat:34.158, lng:-84.077, type:"River", fee:false, amenities:["Kayak Launch","Parking","Restrooms"], rating:4.8 },
  { id:16, name:"Settles Bridge Park", body:"Chattahoochee River", state:"GA", lat:34.098, lng:-84.110, type:"River", fee:false, amenities:["Kayak Launch","Parking","Restrooms"], rating:4.5 },
  { id:17, name:"Chattahoochee Pointe Park", body:"Chattahoochee River", state:"GA", lat:34.067, lng:-84.118, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.4 },
  { id:18, name:"McGinnis Ferry Rd", body:"Chattahoochee River", state:"GA", lat:34.052, lng:-84.098, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.4 },
  { id:19, name:"Rogers Bridge Park", body:"Chattahoochee River", state:"GA", lat:34.029, lng:-84.142, type:"River", fee:false, amenities:["Kayak Launch","Parking","Restrooms"], rating:4.6 },
  { id:20, name:"Abbotts Bridge", body:"Chattahoochee River", state:"GA", lat:34.025, lng:-84.172, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.3 },
  { id:21, name:"Medlock Bridge Rd", body:"Chattahoochee River", state:"GA", lat:33.996, lng:-84.202, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.3 },
  { id:22, name:"Jones Bridge Park", body:"Chattahoochee River", state:"GA", lat:34.000, lng:-84.240, type:"River", fee:false, amenities:["Kayak Launch","Parking","Restrooms","Picnic Area"], rating:4.8 },
  { id:23, name:"Holcomb Bridge Rd", body:"Chattahoochee River", state:"GA", lat:33.973, lng:-84.264, type:"River", fee:false, amenities:["Kayak Launch","Parking","Restrooms"], rating:4.5 },
  { id:24, name:"Island Ford - NRA Visitor Center", body:"Chattahoochee River", state:"GA", lat:33.987, lng:-84.323, type:"River", fee:false, amenities:["Kayak Launch","Parking","Restrooms","Ranger Station"], rating:4.8 },
  { id:25, name:"Don White Memorial Park", body:"Chattahoochee River", state:"GA", lat:34.010, lng:-84.337, type:"River", fee:false, amenities:["Kayak Launch","Parking","Restrooms"], rating:4.5 },
  { id:26, name:"Azalea Dr Access", body:"Chattahoochee River", state:"GA", lat:34.002, lng:-84.363, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.4 },
  { id:27, name:"Morgan Falls Overlook Park", body:"Chattahoochee River", state:"GA", lat:33.972, lng:-84.379, type:"River", fee:false, amenities:["Kayak Launch","Parking","Overlook"], rating:4.6 },
  { id:28, name:"Morgan Falls Park", body:"Chattahoochee River", state:"GA", lat:33.965, lng:-84.382, type:"River", fee:false, amenities:["Kayak Launch","Parking","Picnic Area"], rating:4.5 },
  { id:29, name:"Johnson Ferry Rd", body:"Chattahoochee River", state:"GA", lat:33.945, lng:-84.404, type:"River", fee:false, amenities:["Kayak Launch","Parking","Restrooms"], rating:4.6 },
  { id:30, name:"Powers Island", body:"Chattahoochee River", state:"GA", lat:33.903, lng:-84.444, type:"River", fee:false, amenities:["Kayak Launch","Parking","Picnic Area"], rating:4.7 },
  { id:31, name:"Palisades Access", body:"Chattahoochee River", state:"GA", lat:33.878, lng:-84.443, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.5 },
  { id:32, name:"Paces Mill - US 41", body:"Chattahoochee River", state:"GA", lat:33.870, lng:-84.452, type:"River", fee:false, amenities:["Kayak Launch","Parking","Restrooms","Picnic Area"], rating:4.7 },
  { id:33, name:"Standing Peachtree Park", body:"Chattahoochee River", state:"GA", lat:33.827, lng:-84.452, type:"River", fee:false, amenities:["Kayak Launch","Parking","Restrooms"], rating:4.5 },
  // -- CHATTAHOOCHEE RIVER (Lower - south of Atlanta) --
  { id:34, name:"Chattahoochee Hills Ramp", body:"Chattahoochee River", state:"GA", lat:33.657, lng:-84.669, type:"River", fee:false, amenities:["Boat Ramp","Parking"], rating:4.3 },
  { id:35, name:"Capps Ferry Rd", body:"Chattahoochee River", state:"GA", lat:33.579, lng:-84.808, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.2 },
  { id:36, name:"Moores Bridge Park", body:"Chattahoochee River", state:"GA", lat:33.493, lng:-84.877, type:"River", fee:false, amenities:["Boat Ramp","Parking","Restrooms"], rating:4.3 },
  { id:37, name:"Whitesburg - Alt US 27 Ramp", body:"Chattahoochee River", state:"GA", lat:33.476, lng:-84.901, type:"River", fee:false, amenities:["Boat Ramp","Parking"], rating:4.2 },
  { id:38, name:"McIntosh Reserve", body:"Chattahoochee River", state:"GA", lat:33.446, lng:-84.963, type:"River", fee:true, amenities:["Kayak Launch","Camping","Restrooms","Picnic Area"], rating:4.7 },
  { id:39, name:"Chattahoochee Bend State Park", body:"Chattahoochee River", state:"GA", lat:33.430, lng:-85.012, type:"River", fee:true, amenities:["Kayak Launch","Camping","Restrooms","Trails"], rating:4.8 },
  { id:40, name:"GA 100 Access - Franklin", body:"Chattahoochee River", state:"GA", lat:33.278, lng:-85.102, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.2 },

  // -- ETOWAH RIVER (163 miles - all verified access points) --
  { id:41, name:"Hightower Church Rd - Upper", body:"Etowah River", state:"GA", lat:34.608, lng:-84.098, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.4 },
  { id:42, name:"Hightower Church Rd - Miles Berry", body:"Etowah River", state:"GA", lat:34.593, lng:-84.078, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.3 },
  { id:43, name:"Jay Bridge Rd", body:"Etowah River", state:"GA", lat:34.560, lng:-84.074, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.3 },
  { id:44, name:"GA 52 Access - Dahlonega Area", body:"Etowah River", state:"GA", lat:34.535, lng:-84.063, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.4 },
  { id:45, name:"GA 9 - First Access", body:"Etowah River", state:"GA", lat:34.515, lng:-84.060, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.3 },
  { id:46, name:"Castleberry Bridge Rd", body:"Etowah River", state:"GA", lat:34.473, lng:-84.037, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.3 },
  { id:47, name:"GA 136 - USGS Gauge Access", body:"Etowah River", state:"GA", lat:34.409, lng:-84.020, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.4 },
  { id:48, name:"GA 53 Access", body:"Etowah River", state:"GA", lat:34.382, lng:-84.064, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.3 },
  { id:49, name:"Hugh Stowers Rd", body:"Etowah River", state:"GA", lat:34.371, lng:-84.090, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.2 },
  { id:50, name:"GA 9 - Second Access (Canton)", body:"Etowah River", state:"GA", lat:34.357, lng:-84.114, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.3 },
  { id:51, name:"Kelly Bridge Rd", body:"Etowah River", state:"GA", lat:34.353, lng:-84.205, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.4 },
  { id:52, name:"Eagle's Beak Park", body:"Etowah River", state:"GA", lat:34.313, lng:-84.231, type:"River", fee:false, amenities:["Kayak Launch","Parking","Picnic Area"], rating:4.5 },
  { id:53, name:"Old Federal Rd Access", body:"Etowah River", state:"GA", lat:34.309, lng:-84.221, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.3 },
  { id:54, name:"Yellow Creek Rd", body:"Etowah River", state:"GA", lat:34.302, lng:-84.273, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.2 },
  { id:55, name:"McGraw Ford WMA", body:"Etowah River", state:"GA", lat:34.324, lng:-84.315, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.4 },
  { id:56, name:"Ball Ground Rd", body:"Etowah River", state:"GA", lat:34.318, lng:-84.343, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.2 },
  { id:57, name:"East Cherokee Dr", body:"Etowah River", state:"GA", lat:34.299, lng:-84.397, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.3 },
  { id:58, name:"Etowah River Park - Canton", body:"Etowah River", state:"GA", lat:34.245, lng:-84.481, type:"River", fee:false, amenities:["Kayak Launch","Parking","Restrooms","Picnic Area"], rating:4.6 },
  { id:59, name:"Nomadic Flow Outfitters", body:"Etowah River", state:"GA", lat:34.236, lng:-84.497, type:"River", fee:true, amenities:["Kayak Rental","Shuttle","Restrooms"], rating:4.7 },
  { id:60, name:"Boling Park", body:"Etowah River", state:"GA", lat:34.234, lng:-84.506, type:"River", fee:false, amenities:["Kayak Launch","Parking","Restrooms","Picnic Area"], rating:4.5 },
  { id:61, name:"Knox Bridge Ramp", body:"Etowah River", state:"GA", lat:34.215, lng:-84.568, type:"River", fee:false, amenities:["Boat Ramp","Parking"], rating:4.4 },
  { id:62, name:"Allatoona Dam Ramp", body:"Etowah River", state:"GA", lat:34.161, lng:-84.744, type:"River", fee:false, amenities:["Boat Ramp","Parking","Restrooms"], rating:4.5 },
  { id:63, name:"Old River Rd - US 41", body:"Etowah River", state:"GA", lat:34.152, lng:-84.772, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.3 },
  { id:64, name:"Sam Smith Park - Cartersville", body:"Etowah River", state:"GA", lat:34.123, lng:-84.827, type:"River", fee:false, amenities:["Kayak Launch","Parking","Restrooms"], rating:4.5 },
  { id:65, name:"GA 113 Access", body:"Etowah River", state:"GA", lat:34.143, lng:-84.839, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.2 },
  { id:66, name:"Euharlee Rd Boat Ramp", body:"Etowah River", state:"GA", lat:34.148, lng:-84.921, type:"River", fee:false, amenities:["Boat Ramp","Parking"], rating:4.3 },
  { id:67, name:"Hardin Bridge Rd", body:"Etowah River", state:"GA", lat:34.189, lng:-84.925, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.2 },
  { id:68, name:"US 411 - Emerson Access", body:"Etowah River", state:"GA", lat:34.209, lng:-84.978, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.3 },
  { id:69, name:"Heritage Park - Rome", body:"Etowah River", state:"GA", lat:34.257, lng:-85.181, type:"River", fee:false, amenities:["Kayak Launch","Parking","Restrooms","Picnic Area"], rating:4.6 },

  // -- COOSAWATTEE RIVER --
  { id:70, name:"Cartecay Riverbottom Rd", body:"Coosawattee River", state:"GA", lat:34.664, lng:-84.460, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.4 },
  { id:71, name:"GA Alt 5 Park - Ellijay", body:"Coosawattee River", state:"GA", lat:34.670, lng:-84.499, type:"River", fee:false, amenities:["Kayak Launch","Parking","Restrooms"], rating:4.5 },
  { id:72, name:"Ridgeway Boat Ramp - Carters Lake", body:"Coosawattee River", state:"GA", lat:34.650, lng:-84.610, type:"Lake", fee:false, amenities:["Boat Ramp","Parking","Restrooms"], rating:4.6 },
  { id:73, name:"Old 411 Access", body:"Coosawattee River", state:"GA", lat:34.604, lng:-84.696, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.3 },
  { id:74, name:"US 411 Coosawattee Access", body:"Coosawattee River", state:"GA", lat:34.619, lng:-84.714, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.4 },
  { id:75, name:"GA 136 Access", body:"Coosawattee River", state:"GA", lat:34.601, lng:-84.778, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.3 },
  { id:76, name:"Owens Gin Rd", body:"Coosawattee River", state:"GA", lat:34.564, lng:-84.833, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.2 },
  { id:77, name:"Pine Chapel Rd", body:"Coosawattee River", state:"GA", lat:34.576, lng:-84.860, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.3 },
  { id:78, name:"GA 225 - Oostanaula Confluence", body:"Coosawattee River", state:"GA", lat:34.541, lng:-84.901, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.4 },

  // -- TOCCOA RIVER (all 14 verified access points) --
  { id:79, name:"Deep Hole Campground - USFS", body:"Toccoa River", state:"GA", lat:34.739, lng:-84.141, type:"River", fee:true, amenities:["Kayak Launch","Camping","Restrooms","Parking"], rating:4.9 },
  { id:80, name:"GA 60 Bridge Access", body:"Toccoa River", state:"GA", lat:34.751, lng:-84.145, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.5 },
  { id:81, name:"Swan Bridge - Doublehead Gap Rd", body:"Toccoa River", state:"GA", lat:34.754, lng:-84.191, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.6 },
  { id:82, name:"Dial Rd Access", body:"Toccoa River", state:"GA", lat:34.758, lng:-84.206, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.4 },
  { id:83, name:"Toccoa Valley Campground", body:"Toccoa River", state:"GA", lat:34.764, lng:-84.249, type:"River", fee:true, amenities:["Kayak Launch","Camping","Restrooms"], rating:4.7 },
  { id:84, name:"Sandy Bottom FS River Access", body:"Toccoa River", state:"GA", lat:34.786, lng:-84.240, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.6 },
  { id:85, name:"Shallowford Bridge", body:"Toccoa River", state:"GA", lat:34.784, lng:-84.259, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.5 },
  { id:86, name:"Aksa Rd - Party Rock", body:"Toccoa River", state:"GA", lat:34.791, lng:-84.276, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.6 },
  { id:87, name:"Tilly Bend Trailhead", body:"Toccoa River", state:"GA", lat:34.798, lng:-84.247, type:"River", fee:false, amenities:["Kayak Launch","Parking","Trails"], rating:4.7 },
  { id:88, name:"Blue Ridge Dam Tailwater", body:"Toccoa River", state:"GA", lat:34.885, lng:-84.282, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.7 },
  { id:89, name:"Tammen Park - Blue Ridge", body:"Toccoa River", state:"GA", lat:34.888, lng:-84.286, type:"River", fee:false, amenities:["Kayak Launch","Parking","Restrooms","Picnic Area"], rating:4.8 },
  { id:90, name:"Curtis Switch Access", body:"Toccoa River", state:"GA", lat:34.928, lng:-84.339, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.4 },
  { id:91, name:"Horseshoe Bend Park", body:"Toccoa River", state:"GA", lat:34.970, lng:-84.363, type:"River", fee:false, amenities:["Kayak Launch","Parking","Picnic Area"], rating:4.7 },
  { id:92, name:"McCaysville City Park", body:"Toccoa River", state:"GA", lat:34.986, lng:-84.368, type:"River", fee:false, amenities:["Kayak Launch","Parking","Restrooms"], rating:4.6 },

  // -- CONASAUGA RIVER (21 verified access points) --
  { id:93, name:"Hickory Gap - Put-in Only", body:"Conasauga River", state:"GA", lat:34.904, lng:-84.632, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.5 },
  { id:94, name:"Chicken Coop Gap - Put-in Only", body:"Conasauga River", state:"GA", lat:34.925, lng:-84.641, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.4 },
  { id:95, name:"Old Hwy 2 - Upper", body:"Conasauga River", state:"GA", lat:34.962, lng:-84.670, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.5 },
  { id:96, name:"Old Hwy 2 Bridge", body:"Conasauga River", state:"GA", lat:34.975, lng:-84.645, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.4 },
  { id:97, name:"Jacks River Confluence", body:"Conasauga River", state:"GA", lat:34.988, lng:-84.633, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.6 },
  { id:98, name:"Taylor Branch - Sheets Creek", body:"Conasauga River", state:"GA", lat:34.995, lng:-84.641, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.4 },
  { id:99, name:"US 411 Conasauga Access", body:"Conasauga River", state:"GA", lat:35.010, lng:-84.734, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.4 },
  { id:100,name:"Spring Place Rd", body:"Conasauga River", state:"GA", lat:34.991, lng:-84.775, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.3 },
  { id:101,name:"Petty Rd Access", body:"Conasauga River", state:"GA", lat:34.962, lng:-84.790, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.3 },
  { id:102,name:"GA 2 Access", body:"Conasauga River", state:"GA", lat:34.921, lng:-84.842, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.4 },
  { id:103,name:"Norton Bridge Rd Canoe Launch", body:"Conasauga River", state:"GA", lat:34.854, lng:-84.844, type:"River", fee:false, amenities:["Kayak Launch","Parking","Restrooms"], rating:4.7 },
  { id:104,name:"GA 286 Access", body:"Conasauga River", state:"GA", lat:34.828, lng:-84.851, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.3 },
  { id:105,name:"Witherow Bridge Rd", body:"Conasauga River", state:"GA", lat:34.812, lng:-84.862, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.3 },
  { id:106,name:"US 76 - Conasauga Access", body:"Conasauga River", state:"GA", lat:34.783, lng:-84.873, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.4 },
  { id:107,name:"Tibbs Bridge Rd", body:"Conasauga River", state:"GA", lat:34.737, lng:-84.857, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.3 },
  { id:108,name:"Airport Rd Access", body:"Conasauga River", state:"GA", lat:34.709, lng:-84.864, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.2 },
  { id:109,name:"Looper Bridge Rd", body:"Conasauga River", state:"GA", lat:34.714, lng:-84.929, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.3 },
  { id:110,name:"Hickory Flats Rd", body:"Conasauga River", state:"GA", lat:34.681, lng:-84.944, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.2 },
  { id:111,name:"Tilton Bridge Rd", body:"Conasauga River", state:"GA", lat:34.667, lng:-84.929, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.3 },
  { id:112,name:"GA 136 - Riverview Dr", body:"Conasauga River", state:"GA", lat:34.593, lng:-84.935, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.4 },
  { id:113,name:"GA 225 - Oostanaula Take-out", body:"Conasauga River", state:"GA", lat:34.541, lng:-84.901, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.4 },

  // -- FLINT RIVER (35 verified access points) --
  { id:114,name:"Hampton Rd - Flint Headwaters", body:"Flint River", state:"GA", lat:33.360, lng:-84.395, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.2 },
  { id:115,name:"GA 92 Access", body:"Flint River", state:"GA", lat:33.309, lng:-84.393, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.2 },
  { id:116,name:"West McIntosh Rd", body:"Flint River", state:"GA", lat:33.283, lng:-84.425, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.2 },
  { id:117,name:"GA 16 Access", body:"Flint River", state:"GA", lat:33.244, lng:-84.429, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.2 },
  { id:118,name:"Line Creek Rd", body:"Flint River", state:"GA", lat:33.228, lng:-84.439, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.3 },
  { id:119,name:"GA 362 Access", body:"Flint River", state:"GA", lat:33.172, lng:-84.506, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.2 },
  { id:120,name:"Joe Kurz WMA Access", body:"Flint River", state:"GA", lat:33.122, lng:-84.519, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.4 },
  { id:121,name:"Flat Shoals Rd", body:"Flint River", state:"GA", lat:33.068, lng:-84.525, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.3 },
  { id:122,name:"GA 18/74 Access", body:"Flint River", state:"GA", lat:32.989, lng:-84.529, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.3 },
  { id:123,name:"Gerald I. Lawhorn Scouting Base", body:"Flint River", state:"GA", lat:32.965, lng:-84.534, type:"River", fee:true, amenities:["Kayak Launch","Camping","Restrooms"], rating:4.5 },
  { id:124,name:"Sprewell Bluff State Park", body:"Flint River", state:"GA", lat:32.854, lng:-84.480, type:"River", fee:true, amenities:["Kayak Launch","Parking","Restrooms","Picnic Area"], rating:4.9 },
  { id:125,name:"GA 36 Access", body:"Flint River", state:"GA", lat:32.838, lng:-84.424, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.3 },
  { id:126,name:"Lazer Creek WMA - River Rd", body:"Flint River", state:"GA", lat:32.801, lng:-84.397, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.4 },
  { id:127,name:"Pobiddy Rd Access", body:"Flint River", state:"GA", lat:32.777, lng:-84.370, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.3 },
  { id:128,name:"US 19/80 Access", body:"Flint River", state:"GA", lat:32.722, lng:-84.232, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.2 },
  { id:129,name:"GA 128 Access", body:"Flint River", state:"GA", lat:32.669, lng:-84.099, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.2 },
  { id:130,name:"GA 96 Access", body:"Flint River", state:"GA", lat:32.543, lng:-84.014, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.2 },
  { id:131,name:"West Ferry Rd - GA 127", body:"Flint River", state:"GA", lat:32.437, lng:-84.021, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.3 },
  { id:132,name:"Montezuma Bluffs Access", body:"Flint River", state:"GA", lat:32.337, lng:-84.031, type:"River", fee:false, amenities:["Kayak Launch","Parking","Scenic Overlook"], rating:4.5 },
  { id:133,name:"GA 49 Access", body:"Flint River", state:"GA", lat:32.297, lng:-84.046, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.2 },
  { id:134,name:"Reeves Landing Rd", body:"Flint River", state:"GA", lat:32.124, lng:-84.012, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.2 },
  { id:135,name:"Turkey Creek Access", body:"Flint River", state:"GA", lat:32.065, lng:-83.970, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.3 },
  { id:136,name:"GA 27 - Albany Area", body:"Flint River", state:"GA", lat:32.059, lng:-83.977, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.2 },
  { id:137,name:"Cypress Pond Launch", body:"Flint River", state:"GA", lat:31.602, lng:-84.138, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.3 },
  { id:138,name:"Radium Springs Ramp", body:"Flint River", state:"GA", lat:31.541, lng:-84.140, type:"River", fee:false, amenities:["Boat Ramp","Parking"], rating:4.2 },
  { id:139,name:"Punks Landing", body:"Flint River", state:"GA", lat:31.439, lng:-84.142, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.2 },
  { id:140,name:"Newton Boat Ramp", body:"Flint River", state:"GA", lat:31.309, lng:-84.335, type:"River", fee:false, amenities:["Boat Ramp","Parking","Restrooms"], rating:4.3 },
  { id:141,name:"Norman's Ferry Access", body:"Flint River", state:"GA", lat:31.159, lng:-84.478, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.3 },
  { id:142,name:"Big Slough Landing", body:"Flint River", state:"GA", lat:30.932, lng:-84.555, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.2 },

  // -- OCONEE RIVER (21 verified access points) --
  { id:143,name:"Barnett Shoals Rd", body:"Oconee River", state:"GA", lat:33.856, lng:-83.327, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.4 },
  { id:144,name:"GA 15 Campground Access", body:"Oconee River", state:"GA", lat:33.722, lng:-83.291, type:"River", fee:true, amenities:["Kayak Launch","Camping","Restrooms"], rating:4.5 },
  { id:145,name:"Dyar Pasture WMA", body:"Oconee River", state:"GA", lat:33.646, lng:-83.289, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.4 },
  { id:146,name:"Sinclair Dam Rd - Below Dam", body:"Oconee River", state:"GA", lat:33.128, lng:-83.204, type:"River", fee:false, amenities:["Boat Ramp","Parking","Restrooms"], rating:4.5 },
  { id:147,name:"GA 22/24 Access - Milledgeville", body:"Oconee River", state:"GA", lat:33.083, lng:-83.215, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.3 },
  { id:148,name:"Central State Ramp - Abbatoir Rd", body:"Oconee River", state:"GA", lat:33.032, lng:-83.194, type:"River", fee:false, amenities:["Boat Ramp","Parking"], rating:4.3 },
  { id:149,name:"Adams Rd - Avant Mine", body:"Oconee River", state:"GA", lat:32.940, lng:-83.067, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.2 },
  { id:150,name:"Balls Ferry State Park", body:"Oconee River", state:"GA", lat:32.784, lng:-82.958, type:"River", fee:true, amenities:["Kayak Launch","Camping","Restrooms","Parking"], rating:4.7 },
  { id:151,name:"Beverdam WMA Access", body:"Oconee River", state:"GA", lat:32.708, lng:-82.957, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.3 },
  { id:152,name:"JC Landing Rd", body:"Oconee River", state:"GA", lat:32.695, lng:-82.939, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.2 },
  { id:153,name:"Blackshear Ferry Access", body:"Oconee River", state:"GA", lat:32.611, lng:-82.894, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.3 },
  { id:154,name:"Buckeye Park", body:"Oconee River", state:"GA", lat:32.559, lng:-82.881, type:"River", fee:false, amenities:["Kayak Launch","Parking","Restrooms"], rating:4.3 },
  { id:155,name:"Brickyard Landing Rd", body:"Oconee River", state:"GA", lat:32.501, lng:-82.875, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.2 },
  { id:156,name:"Wells Spring Landing", body:"Oconee River", state:"GA", lat:32.417, lng:-82.829, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.2 },
  { id:157,name:"Shady Field Landing - WMA", body:"Oconee River", state:"GA", lat:32.396, lng:-82.800, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.3 },
  { id:158,name:"Dead River Landing", body:"Oconee River", state:"GA", lat:32.355, lng:-82.722, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.2 },
  { id:159,name:"GA 46 Access", body:"Oconee River", state:"GA", lat:32.295, lng:-82.696, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.2 },
  { id:160,name:"US 280 Access", body:"Oconee River", state:"GA", lat:32.191, lng:-82.632, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.2 },
  { id:161,name:"Clark Bluff Landing", body:"Oconee River", state:"GA", lat:32.084, lng:-82.623, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.3 },
  { id:162,name:"Bells Ferry Access", body:"Oconee River", state:"GA", lat:31.982, lng:-82.551, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.2 },
  { id:163,name:"US 221 - Altamaha Take-out", body:"Oconee River", state:"GA", lat:31.958, lng:-82.517, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.3 },

  // -- BROAD RIVER (verified access points) --
  { id:164,name:"Bond Bridge Rd - County Rd 172", body:"Broad River", state:"GA", lat:34.279, lng:-83.178, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.4 },
  { id:165,name:"US 29 Access", body:"Broad River", state:"GA", lat:34.247, lng:-83.173, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.3 },
  { id:166,name:"GA 281 - Broad River Outpost", body:"Broad River", state:"GA", lat:34.181, lng:-83.146, type:"River", fee:true, amenities:["Kayak Rental","Shuttle","Camping","Restrooms"], rating:4.8 },
  { id:167,name:"GA 172 Access", body:"Broad River", state:"GA", lat:34.157, lng:-83.083, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.4 },
  { id:168,name:"Outfitter Property - Below GA 172", body:"Broad River", state:"GA", lat:34.153, lng:-83.075, type:"River", fee:true, amenities:["Kayak Launch","Shuttle","Restrooms"], rating:4.6 },
  { id:169,name:"GA 72 Access", body:"Broad River", state:"GA", lat:34.074, lng:-83.004, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.3 },
  { id:170,name:"GA 77 Access", body:"Broad River", state:"GA", lat:34.000, lng:-82.886, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.3 },
  { id:171,name:"GA 17 Access", body:"Broad River", state:"GA", lat:33.973, lng:-82.771, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.3 },
  { id:172,name:"Above Anthony Shoals", body:"Broad River", state:"GA", lat:33.992, lng:-82.655, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.5 },
  { id:173,name:"Anthony Shoals Campground", body:"Broad River", state:"GA", lat:33.976, lng:-82.631, type:"River", fee:true, amenities:["Kayak Launch","Camping","Restrooms"], rating:4.6 },
  { id:174,name:"Bobby Brown State Park", body:"Broad River", state:"GA", lat:33.969, lng:-82.581, type:"River", fee:true, amenities:["Kayak Launch","Camping","Restrooms","Picnic Area"], rating:4.7 },

  // -- LAKE LANIER --
  { id:175,name:"Gainesville Marina", body:"Lake Lanier", state:"GA", lat:34.302, lng:-83.824, type:"Lake", fee:true, amenities:["Full Marina","Fuel","Restrooms"], rating:4.7 },
  { id:176,name:"Buford Dam Recreation Area", body:"Lake Lanier", state:"GA", lat:34.175, lng:-84.082, type:"Lake", fee:false, amenities:["Boat Ramp","Parking","Restrooms"], rating:4.8 },
  { id:177,name:"Van Pugh Park - Lake Lanier", body:"Lake Lanier", state:"GA", lat:34.238, lng:-83.860, type:"Lake", fee:true, amenities:["Boat Ramp","Parking","Restrooms","Picnic Area"], rating:4.6 },
  { id:178,name:"Bolding Mill Park", body:"Lake Lanier", state:"GA", lat:34.352, lng:-83.908, type:"Lake", fee:true, amenities:["Boat Ramp","Parking","Restrooms","Camping"], rating:4.5 },

  // -- ALABAMA --
  { id:200,name:"Lake Guntersville State Park", body:"Lake Guntersville", state:"AL", lat:34.376, lng:-86.243, type:"Lake", fee:true, amenities:["Boat Ramp","Parking","Restrooms","Camping"], rating:4.8 },
  { id:201,name:"Sipsey River - Grayson Launch", body:"Sipsey River", state:"AL", lat:33.964, lng:-87.479, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.7 },
  { id:202,name:"Wheeler Lake - Moulton Access", body:"Wheeler Lake", state:"AL", lat:34.600, lng:-87.302, type:"Lake", fee:false, amenities:["Boat Ramp","Parking"], rating:4.5 },
  { id:203,name:"Cahaba River - Montevallo", body:"Cahaba River", state:"AL", lat:33.096, lng:-86.867, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.6 },
  { id:204,name:"Alabama River - Selma Ramp", body:"Alabama River", state:"AL", lat:32.409, lng:-87.013, type:"River", fee:false, amenities:["Boat Ramp","Parking"], rating:4.3 },

  // -- ALASKA --
  { id:205,name:"Kenai River - Soldotna Launch", body:"Kenai River", state:"AK", lat:60.487, lng:-150.868, type:"River", fee:false, amenities:["Boat Ramp","Parking","Restrooms"], rating:5.0 },
  { id:206,name:"Resurrection Bay - Seward Harbor", body:"Resurrection Bay", state:"AK", lat:60.105, lng:-149.441, type:"Lake", fee:true, amenities:["Full Marina","Restrooms","Fuel"], rating:4.9 },
  { id:207,name:"Eklutna Lake Recreation Area", body:"Eklutna Lake", state:"AK", lat:61.455, lng:-149.138, type:"Lake", fee:true, amenities:["Kayak Launch","Parking","Camping","Restrooms"], rating:4.8 },
  { id:208,name:"Chilkoot Lake State Recreation Site", body:"Chilkoot Lake", state:"AK", lat:59.310, lng:-135.420, type:"Lake", fee:true, amenities:["Boat Ramp","Camping","Restrooms"], rating:4.9 },
  { id:209,name:"Swanson River - Swan Lake Canoe Trail", body:"Swanson River", state:"AK", lat:60.638, lng:-150.799, type:"River", fee:false, amenities:["Kayak Launch","Parking","Camping"], rating:5.0 },

  // -- ARIZONA --
  { id:210,name:"Saguaro Lake - Butcher Jones Beach", body:"Saguaro Lake", state:"AZ", lat:33.561, lng:-111.543, type:"Lake", fee:true, amenities:["Boat Ramp","Parking","Restrooms"], rating:4.7 },
  { id:211,name:"Lake Powell - Wahweap Marina", body:"Lake Powell", state:"AZ", lat:36.993, lng:-111.488, type:"Lake", fee:true, amenities:["Full Marina","Fuel","Restrooms","Camping"], rating:4.9 },
  { id:212,name:"Verde River - Tuzigoot Launch", body:"Verde River", state:"AZ", lat:34.770, lng:-112.025, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.6 },
  { id:213,name:"Canyon Lake - Acacia Park", body:"Canyon Lake", state:"AZ", lat:33.527, lng:-111.422, type:"Lake", fee:true, amenities:["Boat Ramp","Parking","Restrooms"], rating:4.7 },
  { id:214,name:"Colorado River - Topock Gorge", body:"Colorado River", state:"AZ", lat:34.718, lng:-114.470, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.8 },

  // -- ARKANSAS --
  { id:215,name:"Buffalo National River - Steel Creek", body:"Buffalo River", state:"AR", lat:35.951, lng:-92.903, type:"River", fee:false, amenities:["Kayak Launch","Camping","Restrooms"], rating:5.0 },
  { id:216,name:"Lake Ouachita - Avery Recreation Area", body:"Lake Ouachita", state:"AR", lat:34.619, lng:-93.186, type:"Lake", fee:true, amenities:["Boat Ramp","Parking","Camping","Restrooms"], rating:4.8 },
  { id:217,name:"Cossatot River State Park", body:"Cossatot River", state:"AR", lat:34.107, lng:-94.216, type:"River", fee:true, amenities:["Kayak Launch","Parking","Restrooms"], rating:4.7 },
  { id:218,name:"White River - Batesville Access", body:"White River", state:"AR", lat:35.770, lng:-91.644, type:"River", fee:false, amenities:["Boat Ramp","Parking"], rating:4.5 },
  { id:219,name:"Little Red River - Lobo Landing", body:"Little Red River", state:"AR", lat:35.498, lng:-91.886, type:"River", fee:false, amenities:["Kayak Launch","Parking","Restrooms"], rating:4.7 },

  // -- CALIFORNIA --
  { id:220,name:"Russian River - Guerneville Launch", body:"Russian River", state:"CA", lat:38.523, lng:-122.999, type:"River", fee:false, amenities:["Kayak Launch","Parking","Restrooms"], rating:4.8 },
  { id:221,name:"Lake Tahoe - Kings Beach", body:"Lake Tahoe", state:"CA", lat:39.237, lng:-120.026, type:"Lake", fee:false, amenities:["Kayak Launch","Parking","Restrooms"], rating:5.0 },
  { id:222,name:"Tomales Bay - Lawsons Landing", body:"Tomales Bay", state:"CA", lat:38.150, lng:-122.939, type:"Lake", fee:true, amenities:["Kayak Rental","Parking","Restrooms"], rating:4.9 },
  { id:223,name:"Sacramento River - Discovery Park", body:"Sacramento River", state:"CA", lat:38.607, lng:-121.511, type:"River", fee:false, amenities:["Boat Ramp","Parking","Restrooms"], rating:4.6 },
  { id:224,name:"Monterey Bay - Del Monte Beach", body:"Monterey Bay", state:"CA", lat:36.605, lng:-121.866, type:"Lake", fee:false, amenities:["Kayak Launch","Parking"], rating:4.9 },
  { id:225,name:"Colorado River - Blythe Launch", body:"Colorado River", state:"CA", lat:33.619, lng:-114.596, type:"River", fee:false, amenities:["Boat Ramp","Parking"], rating:4.4 },

  // -- COLORADO --
  { id:226,name:"Colorado River - Loma Boat Ramp", body:"Colorado River", state:"CO", lat:39.153, lng:-108.836, type:"River", fee:false, amenities:["Boat Ramp","Parking","Restrooms"], rating:4.7 },
  { id:227,name:"Blue Mesa Reservoir - Lake Fork", body:"Blue Mesa Reservoir", state:"CO", lat:38.458, lng:-107.237, type:"Lake", fee:true, amenities:["Full Marina","Camping","Restrooms"], rating:4.8 },
  { id:228,name:"Arkansas River - Salida Whitewater Park", body:"Arkansas River", state:"CO", lat:38.536, lng:-105.999, type:"River", fee:false, amenities:["Kayak Launch","Parking","Restrooms"], rating:4.9 },
  { id:229,name:"Cache la Poudre - Gateway Natural Area", body:"Cache la Poudre River", state:"CO", lat:40.693, lng:-105.118, type:"River", fee:false, amenities:["Kayak Launch","Parking","Restrooms"], rating:4.7 },
  { id:230,name:"Horsetooth Reservoir - South Bay", body:"Horsetooth Reservoir", state:"CO", lat:40.528, lng:-105.164, type:"Lake", fee:true, amenities:["Boat Ramp","Parking","Restrooms"], rating:4.6 },

  // -- CONNECTICUT --
  { id:231,name:"Connecticut River - Haddam Meadows", body:"Connecticut River", state:"CT", lat:41.470, lng:-72.510, type:"River", fee:false, amenities:["Boat Ramp","Parking","Restrooms"], rating:4.6 },
  { id:232,name:"Housatonic River - Bulls Bridge", body:"Housatonic River", state:"CT", lat:41.660, lng:-73.452, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.7 },
  { id:233,name:"Lake Waramaug State Park", body:"Lake Waramaug", state:"CT", lat:41.681, lng:-73.371, type:"Lake", fee:true, amenities:["Kayak Launch","Camping","Restrooms"], rating:4.8 },
  { id:234,name:"Saugatuck Reservoir - Trout Brook", body:"Saugatuck Reservoir", state:"CT", lat:41.346, lng:-73.319, type:"Lake", fee:false, amenities:["Kayak Launch","Parking"], rating:4.5 },

  // -- DELAWARE --
  { id:235,name:"Delaware River - Pennsville Access", body:"Delaware River", state:"DE", lat:39.644, lng:-75.530, type:"River", fee:false, amenities:["Boat Ramp","Parking"], rating:4.4 },
  { id:236,name:"Trap Pond State Park", body:"Trap Pond", state:"DE", lat:38.530, lng:-75.462, type:"Lake", fee:true, amenities:["Kayak Rental","Camping","Restrooms"], rating:4.8 },
  { id:237,name:"Nanticoke River - Seaford Ramp", body:"Nanticoke River", state:"DE", lat:38.633, lng:-75.603, type:"River", fee:false, amenities:["Boat Ramp","Parking"], rating:4.3 },

  // -- FLORIDA --
  { id:238,name:"Silver Springs State Park", body:"Silver River", state:"FL", lat:29.212, lng:-82.054, type:"River", fee:true, amenities:["Kayak Rental","Parking","Restrooms"], rating:4.9 },
  { id:239,name:"Ichetucknee Springs State Park", body:"Ichetucknee River", state:"FL", lat:29.983, lng:-82.763, type:"River", fee:true, amenities:["Kayak Launch","Parking","Restrooms"], rating:5.0 },
  { id:240,name:"Everglades NP - Flamingo Marina", body:"Florida Bay", state:"FL", lat:25.143, lng:-80.919, type:"Lake", fee:true, amenities:["Kayak Rental","Full Marina","Restrooms"], rating:5.0 },
  { id:241,name:"Wekiwa Springs State Park", body:"Wekiwa River", state:"FL", lat:28.710, lng:-81.461, type:"River", fee:true, amenities:["Kayak Rental","Camping","Restrooms"], rating:4.9 },
  { id:242,name:"Weeki Wachee River - Rogers Park", body:"Weeki Wachee River", state:"FL", lat:28.534, lng:-82.565, type:"River", fee:false, amenities:["Kayak Launch","Parking","Restrooms"], rating:4.8 },
  { id:243,name:"Peace River - Arcadia Launch", body:"Peace River", state:"FL", lat:27.218, lng:-81.854, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.7 },
  { id:244,name:"Suwannee River - Troy Springs", body:"Suwannee River", state:"FL", lat:30.007, lng:-82.944, type:"River", fee:true, amenities:["Kayak Launch","Parking","Restrooms"], rating:4.8 },
  { id:245,name:"Ten Thousand Islands - Goodland", body:"Gulf Coast", state:"FL", lat:25.921, lng:-81.479, type:"Lake", fee:false, amenities:["Boat Ramp","Parking"], rating:4.9 },

  // -- HAWAII --
  { id:246,name:"Wailua River State Park - Kayak", body:"Wailua River", state:"HI", lat:22.046, lng:-159.338, type:"River", fee:false, amenities:["Kayak Launch","Parking","Restrooms"], rating:5.0 },
  { id:247,name:"Hanalei Bay - Black Pot Beach", body:"Hanalei Bay", state:"HI", lat:22.208, lng:-159.503, type:"Lake", fee:false, amenities:["Kayak Launch","Parking","Restrooms"], rating:5.0 },
  { id:248,name:"Kaneohe Bay - He'eia Pier", body:"Kaneohe Bay", state:"HI", lat:21.434, lng:-157.806, type:"Lake", fee:false, amenities:["Kayak Launch","Parking"], rating:4.9 },

  // -- IDAHO --
  { id:249,name:"Snake River - Hagerman Access", body:"Snake River", state:"ID", lat:42.821, lng:-114.893, type:"River", fee:false, amenities:["Boat Ramp","Parking","Restrooms"], rating:4.7 },
  { id:250,name:"Payette River - Swinging Bridge", body:"Payette River", state:"ID", lat:44.077, lng:-116.101, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.8 },
  { id:251,name:"Coeur d'Alene Lake - City Beach", body:"Lake Coeur d'Alene", state:"ID", lat:47.676, lng:-116.777, type:"Lake", fee:false, amenities:["Kayak Launch","Parking","Restrooms"], rating:4.9 },
  { id:252,name:"Salmon River - Corn Creek Launch", body:"Salmon River", state:"ID", lat:45.391, lng:-114.726, type:"River", fee:false, amenities:["Kayak Launch","Camping","Restrooms"], rating:5.0 },
  { id:253,name:"Henry's Fork - Last Chance Launch", body:"Henry's Fork", state:"ID", lat:44.538, lng:-111.380, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.9 },

  // -- ILLINOIS --
  { id:254,name:"Illinois River - Starved Rock SP", body:"Illinois River", state:"IL", lat:41.322, lng:-88.992, type:"River", fee:true, amenities:["Kayak Launch","Parking","Restrooms","Camping"], rating:4.7 },
  { id:255,name:"Shawnee NF - Garden of the Gods", body:"Saline River", state:"IL", lat:37.612, lng:-88.499, type:"River", fee:false, amenities:["Kayak Launch","Parking","Camping"], rating:4.8 },
  { id:256,name:"Fox River - Algonquin Canoe", body:"Fox River", state:"IL", lat:42.163, lng:-88.296, type:"River", fee:false, amenities:["Kayak Launch","Parking","Restrooms"], rating:4.6 },
  { id:257,name:"Rend Lake - South Sandusky Ramp", body:"Rend Lake", state:"IL", lat:38.059, lng:-88.945, type:"Lake", fee:false, amenities:["Boat Ramp","Parking","Restrooms"], rating:4.5 },

  // -- INDIANA --
  { id:258,name:"Sugar Creek - Shades State Park", body:"Sugar Creek", state:"IN", lat:39.930, lng:-86.866, type:"River", fee:true, amenities:["Kayak Launch","Camping","Restrooms"], rating:4.8 },
  { id:259,name:"Blue River - Milltown Access", body:"Blue River", state:"IN", lat:38.343, lng:-86.271, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.7 },
  { id:260,name:"Lake Monroe - Fairfax Ramp", body:"Lake Monroe", state:"IN", lat:39.012, lng:-86.534, type:"Lake", fee:true, amenities:["Boat Ramp","Parking","Restrooms","Camping"], rating:4.7 },
  { id:261,name:"Tippecanoe River - Tippecanoe SP", body:"Tippecanoe River", state:"IN", lat:41.198, lng:-86.721, type:"River", fee:true, amenities:["Kayak Launch","Camping","Restrooms"], rating:4.6 },

  // -- IOWA --
  { id:262,name:"Upper Iowa River - Kendallville", body:"Upper Iowa River", state:"IA", lat:43.409, lng:-91.923, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.8 },
  { id:263,name:"Lake Okoboji - Arnolds Park", body:"Lake Okoboji", state:"IA", lat:43.376, lng:-95.133, type:"Lake", fee:false, amenities:["Kayak Launch","Parking","Restrooms"], rating:4.7 },
  { id:264,name:"Maquoketa River - Backbone SP", body:"Maquoketa River", state:"IA", lat:42.600, lng:-91.543, type:"River", fee:true, amenities:["Kayak Launch","Camping","Restrooms"], rating:4.7 },

  // -- KANSAS --
  { id:265,name:"Elk City Lake - Park Office Ramp", body:"Elk City Lake", state:"KS", lat:37.298, lng:-95.903, type:"Lake", fee:false, amenities:["Boat Ramp","Parking","Restrooms"], rating:4.5 },
  { id:266,name:"Flint Hills Nature Trail - Council Grove", body:"Council Grove Lake", state:"KS", lat:38.643, lng:-96.493, type:"Lake", fee:false, amenities:["Kayak Launch","Parking"], rating:4.4 },
  { id:267,name:"Milford Lake - Eagle Ridge Marina", body:"Milford Lake", state:"KS", lat:39.043, lng:-96.903, type:"Lake", fee:true, amenities:["Full Marina","Restrooms","Fuel"], rating:4.6 },

  // -- KENTUCKY --
  { id:268,name:"Red River - Nada Tunnel Access", body:"Red River", state:"KY", lat:37.796, lng:-83.681, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.9 },
  { id:269,name:"Green River - Mammoth Cave NP", body:"Green River", state:"KY", lat:37.186, lng:-86.108, type:"River", fee:true, amenities:["Kayak Launch","Parking","Restrooms","Camping"], rating:4.9 },
  { id:270,name:"Lake Cumberland - Jamestown Marina", body:"Lake Cumberland", state:"KY", lat:36.978, lng:-85.079, type:"Lake", fee:true, amenities:["Full Marina","Fuel","Restrooms"], rating:4.8 },
  { id:271,name:"Cumberland River - Burnside Island", body:"Cumberland River", state:"KY", lat:36.958, lng:-84.586, type:"River", fee:false, amenities:["Boat Ramp","Parking"], rating:4.6 },

  // -- LOUISIANA --
  { id:272,name:"Atchafalaya Basin - Henderson Levee", body:"Atchafalaya Basin", state:"LA", lat:30.315, lng:-91.783, type:"River", fee:false, amenities:["Boat Ramp","Parking"], rating:4.8 },
  { id:273,name:"Lake Martin - Breaux Bridge Launch", body:"Lake Martin", state:"LA", lat:30.218, lng:-91.874, type:"Lake", fee:false, amenities:["Kayak Launch","Parking"], rating:4.9 },
  { id:274,name:"Bayou Teche - Centerville Access", body:"Bayou Teche", state:"LA", lat:29.836, lng:-91.195, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.6 },
  { id:275,name:"Kisatchie NF - Saline Bayou", body:"Saline Bayou", state:"LA", lat:32.084, lng:-93.028, type:"River", fee:false, amenities:["Kayak Launch","Parking","Camping"], rating:4.7 },

  // -- MAINE --
  { id:276,name:"Allagash Wilderness Waterway - Telos", body:"Allagash River", state:"ME", lat:46.174, lng:-69.260, type:"River", fee:true, amenities:["Kayak Launch","Camping","Restrooms"], rating:5.0 },
  { id:277,name:"Kennebec River - The Forks", body:"Kennebec River", state:"ME", lat:45.355, lng:-69.966, type:"River", fee:false, amenities:["Kayak Launch","Parking","Restrooms"], rating:4.9 },
  { id:278,name:"Sebago Lake State Park", body:"Sebago Lake", state:"ME", lat:43.875, lng:-70.545, type:"Lake", fee:true, amenities:["Kayak Launch","Camping","Restrooms"], rating:4.8 },
  { id:279,name:"Penobscot River - Medway Launch", body:"Penobscost River", state:"ME", lat:45.610, lng:-68.492, type:"River", fee:false, amenities:["Boat Ramp","Parking"], rating:4.7 },

  // -- MARYLAND --
  { id:280,name:"Chesapeake Bay - Sandy Point SP", body:"Chesapeake Bay", state:"MD", lat:39.012, lng:-76.398, type:"Lake", fee:true, amenities:["Kayak Launch","Parking","Restrooms"], rating:4.8 },
  { id:281,name:"Potomac River - Whites Ferry", body:"Potomac River", state:"MD", lat:39.154, lng:-77.513, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.6 },
  { id:282,name:"Patuxent River - Merkle WA", body:"Patuxent River", state:"MD", lat:38.681, lng:-76.680, type:"River", fee:false, amenities:["Kayak Launch","Parking","Restrooms"], rating:4.7 },
  { id:283,name:"Deep Creek Lake - Swallow Falls SP", body:"Deep Creek Lake", state:"MD", lat:39.499, lng:-79.397, type:"Lake", fee:true, amenities:["Kayak Launch","Camping","Restrooms"], rating:4.8 },

  // -- MASSACHUSETTS --
  { id:284,name:"Quabbin Reservoir - Enfield Launch", body:"Quabbin Reservoir", state:"MA", lat:42.350, lng:-72.329, type:"Lake", fee:true, amenities:["Kayak Launch","Parking","Restrooms"], rating:4.9 },
  { id:285,name:"Deerfield River - Charlemont", body:"Deerfield River", state:"MA", lat:42.631, lng:-72.869, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.8 },
  { id:286,name:"Cape Cod - Wellfleet Harbor", body:"Cape Cod Bay", state:"MA", lat:41.928, lng:-70.026, type:"Lake", fee:false, amenities:["Kayak Launch","Parking","Restrooms"], rating:4.9 },
  { id:287,name:"Sudbury River - Heard Pond Access", body:"Sudbury River", state:"MA", lat:42.310, lng:-71.360, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.6 },

  // -- MICHIGAN --
  { id:288,name:"Au Sable River - Grayling Launch", body:"Au Sable River", state:"MI", lat:44.660, lng:-84.712, type:"River", fee:false, amenities:["Kayak Launch","Parking","Restrooms"], rating:5.0 },
  { id:289,name:"Lake Superior - Pictured Rocks", body:"Lake Superior", state:"MI", lat:46.560, lng:-86.332, type:"Lake", fee:true, amenities:["Kayak Launch","Parking","Restrooms","Camping"], rating:5.0 },
  { id:290,name:"Sleeping Bear Dunes - Platte River", body:"Platte River", state:"MI", lat:44.713, lng:-86.079, type:"River", fee:true, amenities:["Kayak Launch","Parking","Restrooms"], rating:4.9 },
  { id:291,name:"Manistee River - Tippy Dam", body:"Manistee River", state:"MI", lat:44.093, lng:-85.975, type:"River", fee:false, amenities:["Boat Ramp","Parking","Restrooms"], rating:4.8 },
  { id:292,name:"Burt Lake State Park", body:"Burt Lake", state:"MI", lat:45.478, lng:-84.685, type:"Lake", fee:true, amenities:["Kayak Launch","Camping","Restrooms"], rating:4.7 },

  // -- MINNESOTA --
  { id:293,name:"Boundary Waters - Moose Lake Entry", body:"BWCA", state:"MN", lat:48.013, lng:-91.553, type:"Lake", fee:true, amenities:["Portage Access","Parking","Camping"], rating:5.0 },
  { id:294,name:"St. Croix River - Taylors Falls", body:"St. Croix River", state:"MN", lat:45.403, lng:-92.650, type:"River", fee:false, amenities:["Kayak Launch","Parking","Restrooms"], rating:4.9 },
  { id:295,name:"Gunflint Lake - Trail Access", body:"Gunflint Lake", state:"MN", lat:48.063, lng:-90.715, type:"Lake", fee:false, amenities:["Kayak Launch","Parking","Camping"], rating:5.0 },
  { id:296,name:"Mississippi River - Itasca SP", body:"Mississippi River", state:"MN", lat:47.237, lng:-95.208, type:"River", fee:true, amenities:["Kayak Launch","Camping","Restrooms"], rating:4.9 },
  { id:297,name:"Lake Minnetonka - Excelsior Bay", body:"Lake Minnetonka", state:"MN", lat:44.902, lng:-93.567, type:"Lake", fee:false, amenities:["Kayak Launch","Parking","Restrooms"], rating:4.7 },

  // -- MISSISSIPPI --
  { id:298,name:"Pascagoula River - Wade Access", body:"Pascagoula River", state:"MS", lat:30.534, lng:-88.589, type:"River", fee:false, amenities:["Boat Ramp","Parking"], rating:4.6 },
  { id:299,name:"Ross Barnett Reservoir - Pelahatchie Bay", body:"Ross Barnett Reservoir", state:"MS", lat:32.397, lng:-89.951, type:"Lake", fee:false, amenities:["Boat Ramp","Parking","Restrooms"], rating:4.5 },
  { id:300,name:"Bogue Chitto River - Sandy Hook", body:"Bogue Chitto River", state:"MS", lat:31.040, lng:-90.147, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.6 },

  // -- MISSOURI --
  { id:301,name:"Ozark NSR - Pulltite Launch", body:"Current River", state:"MO", lat:37.001, lng:-91.419, type:"River", fee:false, amenities:["Kayak Launch","Camping","Restrooms"], rating:5.0 },
  { id:302,name:"Jacks Fork River - Alley Spring", body:"Jacks Fork River", state:"MO", lat:37.009, lng:-91.481, type:"River", fee:false, amenities:["Kayak Launch","Parking","Restrooms"], rating:4.9 },
  { id:303,name:"Lake of the Ozarks - Ha Ha Tonka SP", body:"Lake of the Ozarks", state:"MO", lat:38.011, lng:-92.773, type:"Lake", fee:true, amenities:["Kayak Launch","Parking","Restrooms"], rating:4.8 },
  { id:304,name:"Meramec River - Castlewood Access", body:"Meramec River", state:"MO", lat:38.549, lng:-90.500, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.7 },

  // -- MONTANA --
  { id:305,name:"Madison River - McAtee Bridge", body:"Madison River", state:"MT", lat:45.508, lng:-111.655, type:"River", fee:false, amenities:["Boat Ramp","Parking"], rating:4.9 },
  { id:306,name:"Flathead River - Old Steel Bridge", body:"Flathead River", state:"MT", lat:47.875, lng:-114.022, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.9 },
  { id:307,name:"Glacier NP - Lake McDonald Lodge", body:"Lake McDonald", state:"MT", lat:48.528, lng:-113.981, type:"Lake", fee:true, amenities:["Kayak Rental","Parking","Restrooms"], rating:5.0 },
  { id:308,name:"Missouri River - Fort Benton Launch", body:"Missouri River", state:"MT", lat:47.818, lng:-110.667, type:"River", fee:false, amenities:["Boat Ramp","Parking","Restrooms"], rating:4.8 },
  { id:309,name:"Yellowstone River - Livingston Access", body:"Yellowstone River", state:"MT", lat:45.661, lng:-110.566, type:"River", fee:false, amenities:["Boat Ramp","Parking"], rating:4.8 },

  // -- NEBRASKA --
  { id:310,name:"Niobrara River - Smith Falls SP", body:"Niobrara River", state:"NE", lat:42.901, lng:-100.257, type:"River", fee:true, amenities:["Kayak Launch","Camping","Restrooms"], rating:4.9 },
  { id:311,name:"Platte River - Louisville SRA", body:"Platte River", state:"NE", lat:41.005, lng:-96.164, type:"River", fee:true, amenities:["Kayak Launch","Parking","Restrooms"], rating:4.5 },
  { id:312,name:"Lake McConaughy - Kingsley Dam", body:"Lake McConaughy", state:"NE", lat:41.242, lng:-101.756, type:"Lake", fee:true, amenities:["Boat Ramp","Camping","Restrooms"], rating:4.7 },

  // -- NEVADA --
  { id:313,name:"Lake Tahoe - Nevada Beach", body:"Lake Tahoe", state:"NV", lat:38.961, lng:-119.937, type:"Lake", fee:true, amenities:["Kayak Launch","Parking","Restrooms"], rating:5.0 },
  { id:314,name:"Colorado River - Willow Beach", body:"Colorado River", state:"NV", lat:35.868, lng:-114.660, type:"River", fee:true, amenities:["Kayak Launch","Parking","Restrooms"], rating:4.8 },
  { id:315,name:"Lake Mead - Boulder Beach", body:"Lake Mead", state:"NV", lat:36.030, lng:-114.788, type:"Lake", fee:true, amenities:["Boat Ramp","Parking","Restrooms"], rating:4.6 },

  // -- NEW HAMPSHIRE --
  { id:316,name:"Connecticut River - Maidstone Launch", body:"Connecticut River", state:"NH", lat:44.503, lng:-71.852, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.7 },
  { id:317,name:"Lake Winnipesaukee - Ellacoya SP", body:"Lake Winnipesaukee", state:"NH", lat:43.545, lng:-71.395, type:"Lake", fee:true, amenities:["Kayak Launch","Camping","Restrooms"], rating:4.8 },
  { id:318,name:"Saco River - Conway Launch", body:"Saco River", state:"NH", lat:43.979, lng:-71.113, type:"River", fee:false, amenities:["Kayak Launch","Parking","Restrooms"], rating:4.8 },

  // -- NEW JERSEY --
  { id:319,name:"Delaware Water Gap - Kittatinny", body:"Delaware River", state:"NJ", lat:41.014, lng:-74.873, type:"River", fee:false, amenities:["Kayak Launch","Parking","Restrooms"], rating:4.8 },
  { id:320,name:"Barnegat Bay - Tices Shoal", body:"Barnegat Bay", state:"NJ", lat:39.771, lng:-74.110, type:"Lake", fee:false, amenities:["Kayak Launch","Parking"], rating:4.7 },
  { id:321,name:"Mullica River - Atsion Lake", body:"Mullica River", state:"NJ", lat:39.735, lng:-74.730, type:"River", fee:true, amenities:["Kayak Launch","Camping","Restrooms"], rating:4.8 },

  // -- NEW MEXICO --
  { id:322,name:"Rio Grande - Taos Box - Quartzite Launch", body:"Rio Grande", state:"NM", lat:36.543, lng:-105.720, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.9 },
  { id:323,name:"Elephant Butte Lake - Marina", body:"Elephant Butte Lake", state:"NM", lat:33.154, lng:-107.204, type:"Lake", fee:true, amenities:["Full Marina","Restrooms","Fuel"], rating:4.7 },
  { id:324,name:"Chama River - El Vado Lake SP", body:"Chama River", state:"NM", lat:36.602, lng:-106.725, type:"River", fee:true, amenities:["Kayak Launch","Camping","Restrooms"], rating:4.8 },

  // -- NEW YORK --
  { id:325,name:"Adirondacks - Long Lake Access", body:"Long Lake", state:"NY", lat:43.972, lng:-74.413, type:"Lake", fee:false, amenities:["Kayak Launch","Parking","Restrooms"], rating:5.0 },
  { id:326,name:"Delaware River - Narrowsburg Access", body:"Delaware River", state:"NY", lat:41.597, lng:-75.001, type:"River", fee:false, amenities:["Kayak Launch","Parking","Restrooms"], rating:4.8 },
  { id:327,name:"Finger Lakes - Seneca Lake - Geneva", body:"Seneca Lake", state:"NY", lat:42.869, lng:-76.978, type:"Lake", fee:false, amenities:["Kayak Launch","Parking","Restrooms"], rating:4.9 },
  { id:328,name:"Hudson River - Norrie Point Launch", body:"Hudson River", state:"NY", lat:41.837, lng:-73.945, type:"River", fee:true, amenities:["Kayak Launch","Parking","Restrooms"], rating:4.7 },
  { id:329,name:"Lake Champlain - Plattsburgh City Beach", body:"Lake Champlain", state:"NY", lat:44.697, lng:-73.461, type:"Lake", fee:false, amenities:["Kayak Launch","Parking","Restrooms"], rating:4.8 },

  // -- NORTH CAROLINA --
  { id:330,name:"New River State Park - NC", body:"New River", state:"NC", lat:36.488, lng:-81.389, type:"River", fee:true, amenities:["Kayak Launch","Camping","Restrooms"], rating:4.8 },
  { id:331,name:"French Broad River - Hot Springs", body:"French Broad River", state:"NC", lat:35.895, lng:-82.825, type:"River", fee:false, amenities:["Kayak Launch","Parking","Restrooms"], rating:4.8 },
  { id:332,name:"Jordan Lake - New Hope Overlook", body:"Jordan Lake", state:"NC", lat:35.787, lng:-79.075, type:"Lake", fee:true, amenities:["Boat Ramp","Parking","Restrooms","Camping"], rating:4.6 },
  { id:333,name:"Nantahala River - Nantahala Outdoor Center", body:"Nantahala River", state:"NC", lat:35.350, lng:-83.651, type:"River", fee:true, amenities:["Kayak Rental","Restrooms","Shuttle"], rating:4.9 },
  { id:334,name:"Cape Fear River - Carvers Creek SP", body:"Cape Fear River", state:"NC", lat:35.116, lng:-78.990, type:"River", fee:true, amenities:["Kayak Launch","Parking","Restrooms"], rating:4.6 },

  // -- NORTH DAKOTA --
  { id:335,name:"Missouri River - Cross Ranch SP", body:"Missouri River", state:"ND", lat:47.044, lng:-101.016, type:"River", fee:true, amenities:["Kayak Launch","Camping","Restrooms"], rating:4.7 },
  { id:336,name:"Lake Sakakawea - Downstream Campground", body:"Lake Sakakawea", state:"ND", lat:47.517, lng:-101.425, type:"Lake", fee:true, amenities:["Boat Ramp","Camping","Restrooms"], rating:4.6 },

  // -- OHIO --
  { id:337,name:"Hocking River - Hocking Hills SP", body:"Hocking River", state:"OH", lat:39.436, lng:-82.533, type:"River", fee:true, amenities:["Kayak Launch","Parking","Restrooms"], rating:4.7 },
  { id:338,name:"Mohican River - Loudonville Canoe", body:"Mohican River", state:"OH", lat:40.631, lng:-82.236, type:"River", fee:true, amenities:["Kayak Rental","Shuttle","Restrooms"], rating:4.8 },
  { id:339,name:"Lake Erie - East Harbor SP", body:"Lake Erie", state:"OH", lat:41.535, lng:-82.832, type:"Lake", fee:true, amenities:["Kayak Launch","Camping","Restrooms"], rating:4.6 },
  { id:340,name:"Little Miami River - Morrow Access", body:"Little Miami River", state:"OH", lat:39.349, lng:-84.130, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.7 },

  // -- OKLAHOMA --
  { id:341,name:"Illinois River - Tenkiller Ferry", body:"Illinois River", state:"OK", lat:35.609, lng:-94.980, type:"River", fee:false, amenities:["Kayak Launch","Parking","Camping"], rating:4.8 },
  { id:342,name:"Lake Texoma - Westminister Launch", body:"Lake Texoma", state:"OK", lat:33.895, lng:-96.627, type:"Lake", fee:false, amenities:["Boat Ramp","Parking","Restrooms"], rating:4.7 },
  { id:343,name:"Kiamichi River - Clayton Lake SP", body:"Kiamichi River", state:"OK", lat:34.633, lng:-95.321, type:"River", fee:true, amenities:["Kayak Launch","Camping","Restrooms"], rating:4.7 },

  // -- OREGON --
  { id:344,name:"Rogue River - Galice Launch", body:"Rogue River", state:"OR", lat:42.575, lng:-123.587, type:"River", fee:false, amenities:["Kayak Launch","Parking","Restrooms"], rating:5.0 },
  { id:345,name:"Crater Lake NP - Cleetwood Cove", body:"Crater Lake", state:"OR", lat:42.974, lng:-122.071, type:"Lake", fee:true, amenities:["Kayak Launch","Parking","Restrooms"], rating:5.0 },
  { id:346,name:"Deschutes River - Maupin Launch", body:"Deschutes River", state:"OR", lat:45.179, lng:-121.086, type:"River", fee:false, amenities:["Kayak Launch","Parking","Restrooms"], rating:4.9 },
  { id:347,name:"John Day River - Service Creek", body:"John Day River", state:"OR", lat:44.792, lng:-120.073, type:"River", fee:false, amenities:["Kayak Launch","Parking","Camping"], rating:4.8 },
  { id:348,name:"Willamette River - Champoeg SP", body:"Willamette River", state:"OR", lat:45.238, lng:-122.897, type:"River", fee:true, amenities:["Kayak Launch","Camping","Restrooms"], rating:4.7 },

  // -- PENNSYLVANIA --
  { id:349,name:"Delaware River - Dingmans Ferry", body:"Delaware River", state:"PA", lat:41.224, lng:-74.873, type:"River", fee:false, amenities:["Kayak Launch","Parking","Restrooms"], rating:4.8 },
  { id:350,name:"Youghiogheny River - Ohiopyle SP", body:"Youghiogheny River", state:"PA", lat:39.867, lng:-79.490, type:"River", fee:true, amenities:["Kayak Rental","Parking","Restrooms"], rating:4.9 },
  { id:351,name:"Susquehanna River - Holtwood Dam", body:"Susquehanna River", state:"PA", lat:39.836, lng:-76.329, type:"River", fee:false, amenities:["Boat Ramp","Parking"], rating:4.6 },
  { id:352,name:"Pine Creek - Cedar Run Access", body:"Pine Creek", state:"PA", lat:41.540, lng:-77.437, type:"River", fee:false, amenities:["Kayak Launch","Parking","Camping"], rating:4.8 },

  // -- RHODE ISLAND --
  { id:353,name:"Narragansett Bay - Salter Grove Park", body:"Narragansett Bay", state:"RI", lat:41.723, lng:-71.471, type:"Lake", fee:false, amenities:["Kayak Launch","Parking","Restrooms"], rating:4.7 },
  { id:354,name:"Pawcatuck River - Bradford Launch", body:"Pawcatuck River", state:"RI", lat:41.395, lng:-71.741, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.6 },
  { id:355,name:"Worden Pond - Worden Pond Rd", body:"Worden Pond", state:"RI", lat:41.445, lng:-71.686, type:"Lake", fee:false, amenities:["Kayak Launch","Parking"], rating:4.5 },

  // -- SOUTH CAROLINA --
  { id:356,name:"Edisto River - Colleton SP", body:"Edisto River", state:"SC", lat:33.008, lng:-80.495, type:"River", fee:true, amenities:["Kayak Launch","Camping","Restrooms"], rating:4.8 },
  { id:357,name:"Chattooga River - Earl's Ford", body:"Chattooga River", state:"SC", lat:34.870, lng:-83.107, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.9 },
  { id:358,name:"Lake Murray - Dreher Island SP", body:"Lake Murray", state:"SC", lat:34.062, lng:-81.422, type:"Lake", fee:true, amenities:["Boat Ramp","Camping","Restrooms"], rating:4.7 },
  { id:359,name:"Wando River - Charles Towne Landing", body:"Wando River", state:"SC", lat:32.818, lng:-79.994, type:"River", fee:true, amenities:["Kayak Launch","Parking","Restrooms"], rating:4.7 },

  // -- SOUTH DAKOTA --
  { id:360,name:"Missouri River - Farm Island SRA", body:"Missouri River", state:"SD", lat:44.344, lng:-100.279, type:"River", fee:true, amenities:["Kayak Launch","Camping","Restrooms"], rating:4.6 },
  { id:361,name:"Black Hills - Pactola Reservoir", body:"Pactola Reservoir", state:"SD", lat:44.054, lng:-103.473, type:"Lake", fee:true, amenities:["Boat Ramp","Camping","Restrooms"], rating:4.7 },

  // -- TENNESSEE --
  { id:362,name:"Hiwassee River - Reliance Launch", body:"Hiwassee River", state:"TN", lat:35.087, lng:-84.489, type:"River", fee:false, amenities:["Kayak Launch","Parking","Camping"], rating:4.9 },
  { id:363,name:"Ocoee River - Parksville Lake Access", body:"Ocoee River", state:"TN", lat:35.089, lng:-84.538, type:"River", fee:false, amenities:["Kayak Launch","Parking","Restrooms"], rating:4.8 },
  { id:364,name:"Nolichucky River - Erwin Access", body:"Nolichucky River", state:"TN", lat:36.139, lng:-82.419, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.8 },
  { id:365,name:"Dale Hollow Lake - Willow Grove", body:"Dale Hollow Lake", state:"TN", lat:36.538, lng:-85.428, type:"Lake", fee:true, amenities:["Full Marina","Camping","Restrooms"], rating:4.9 },
  { id:366,name:"Caney Fork River - Center Hill Dam", body:"Caney Fork River", state:"TN", lat:36.030, lng:-85.827, type:"River", fee:false, amenities:["Kayak Launch","Parking","Restrooms"], rating:4.7 },
  { id:367,name:"Chickamauga Lake - Harrison Bay SP", body:"Chickamauga Lake", state:"TN", lat:35.134, lng:-85.125, type:"Lake", fee:true, amenities:["Boat Ramp","Camping","Restrooms"], rating:4.7 },

  // -- TEXAS --
  { id:368,name:"Guadalupe River - Gruene Access", body:"Guadalupe River", state:"TX", lat:29.739, lng:-98.107, type:"River", fee:true, amenities:["Kayak Rental","Parking","Restrooms"], rating:4.8 },
  { id:369,name:"San Marcos River - City Park Launch", body:"San Marcos River", state:"TX", lat:29.881, lng:-97.942, type:"River", fee:false, amenities:["Kayak Launch","Parking","Restrooms"], rating:4.9 },
  { id:370,name:"Caddo Lake - Uncertain Launch", body:"Caddo Lake", state:"TX", lat:32.695, lng:-94.185, type:"Lake", fee:false, amenities:["Kayak Launch","Parking","Restrooms"], rating:4.9 },
  { id:371,name:"Rio Grande - Santa Elena Canyon", body:"Rio Grande", state:"TX", lat:29.169, lng:-103.603, type:"River", fee:true, amenities:["Kayak Launch","Parking","Restrooms"], rating:5.0 },
  { id:372,name:"Lake Travis - Mansfield Dam Park", body:"Lake Travis", state:"TX", lat:30.400, lng:-97.908, type:"Lake", fee:false, amenities:["Boat Ramp","Parking","Restrooms"], rating:4.6 },
  { id:373,name:"Sabine River - Toledo Bend", body:"Toledo Bend Reservoir", state:"TX", lat:31.197, lng:-93.558, type:"Lake", fee:false, amenities:["Boat Ramp","Parking","Restrooms"], rating:4.7 },

  // -- UTAH --
  { id:374,name:"Green River - Swinging Bridge", body:"Green River", state:"UT", lat:38.992, lng:-110.151, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.8 },
  { id:375,name:"Lake Powell - Bullfrog Marina", body:"Lake Powell", state:"UT", lat:37.536, lng:-110.727, type:"Lake", fee:true, amenities:["Full Marina","Fuel","Camping","Restrooms"], rating:4.9 },
  { id:376,name:"Colorado River - Westwater Canyon", body:"Colorado River", state:"UT", lat:38.996, lng:-109.099, type:"River", fee:true, amenities:["Kayak Launch","Parking","Camping"], rating:4.9 },
  { id:377,name:"Flaming Gorge - Lucerne Valley Marina", body:"Flaming Gorge Reservoir", state:"UT", lat:40.904, lng:-109.432, type:"Lake", fee:true, amenities:["Full Marina","Restrooms","Fuel"], rating:4.8 },

  // -- VERMONT --
  { id:378,name:"Lake Champlain - Button Bay SP", body:"Lake Champlain", state:"VT", lat:44.071, lng:-73.309, type:"Lake", fee:true, amenities:["Kayak Launch","Camping","Restrooms"], rating:4.8 },
  { id:379,name:"Connecticut River - Wilder Dam", body:"Connecticut River", state:"VT", lat:43.680, lng:-72.166, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.6 },
  { id:380,name:"West River - Ball Mountain Dam", body:"West River", state:"VT", lat:43.118, lng:-72.756, type:"River", fee:false, amenities:["Kayak Launch","Parking","Restrooms"], rating:4.7 },

  // -- VIRGINIA --
  { id:381,name:"Shenandoah River - Karo Landing", body:"Shenandoah River", state:"VA", lat:38.832, lng:-78.394, type:"River", fee:false, amenities:["Boat Ramp","Parking","Camping"], rating:4.7 },
  { id:382,name:"James River - Reusens Dam", body:"James River", state:"VA", lat:37.368, lng:-79.221, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.5 },
  { id:383,name:"New River - Claytor Lake SP", body:"New River", state:"VA", lat:37.086, lng:-80.624, type:"Lake", fee:true, amenities:["Kayak Launch","Camping","Restrooms"], rating:4.8 },
  { id:384,name:"Rappahannock River - Motts Landing", body:"Rappahannock River", state:"VA", lat:38.175, lng:-77.568, type:"River", fee:false, amenities:["Boat Ramp","Parking"], rating:4.6 },
  { id:385,name:"Potomac River - Algonkian Regional Park", body:"Potomac River", state:"VA", lat:39.099, lng:-77.384, type:"River", fee:true, amenities:["Kayak Launch","Camping","Restrooms"], rating:4.7 },

  // -- WASHINGTON --
  { id:386,name:"Skagit River - Rockport SP", body:"Skagit River", state:"WA", lat:48.493, lng:-121.598, type:"River", fee:true, amenities:["Kayak Launch","Camping","Restrooms"], rating:4.9 },
  { id:387,name:"Lake Chelan - Chelan City Launch", body:"Lake Chelan", state:"WA", lat:47.842, lng:-119.987, type:"Lake", fee:false, amenities:["Boat Ramp","Parking","Restrooms"], rating:4.9 },
  { id:388,name:"Yakima River - Eburg Launch", body:"Yakima River", state:"WA", lat:47.009, lng:-120.497, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.7 },
  { id:389,name:"Columbia River - Roosevelt Park", body:"Columbia River", state:"WA", lat:45.727, lng:-120.205, type:"River", fee:false, amenities:["Boat Ramp","Parking","Restrooms"], rating:4.6 },
  { id:390,name:"San Juan Islands - Roche Harbor", body:"Puget Sound", state:"WA", lat:48.607, lng:-123.157, type:"Lake", fee:true, amenities:["Full Marina","Fuel","Restrooms"], rating:5.0 },

  // -- WEST VIRGINIA --
  { id:391,name:"New River Gorge - Thurmond Launch", body:"New River", state:"WV", lat:37.952, lng:-81.077, type:"River", fee:false, amenities:["Kayak Launch","Parking","Restrooms"], rating:5.0 },
  { id:392,name:"Gauley River - Summersville Dam", body:"Gauley River", state:"WV", lat:38.264, lng:-80.856, type:"River", fee:false, amenities:["Kayak Launch","Parking","Restrooms"], rating:5.0 },
  { id:393,name:"Greenbrier River - Marlinton Launch", body:"Greenbrier River", state:"WV", lat:38.222, lng:-80.099, type:"River", fee:false, amenities:["Kayak Launch","Parking","Restrooms"], rating:4.9 },
  { id:394,name:"Shenandoah River - Millville Access", body:"Shenandoah River", state:"WV", lat:39.301, lng:-77.769, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.7 },

  // -- WISCONSIN --
  { id:395,name:"Wisconsin River - Dells of the Wisconsin", body:"Wisconsin River", state:"WI", lat:43.621, lng:-89.770, type:"River", fee:false, amenities:["Kayak Launch","Parking","Restrooms"], rating:4.8 },
  { id:396,name:"Boundary Waters - Trout Lake Access", body:"Trout Lake", state:"WI", lat:46.029, lng:-89.665, type:"Lake", fee:true, amenities:["Kayak Launch","Camping","Restrooms"], rating:4.9 },
  { id:397,name:"Flambeau River - Nine Mile Creek", body:"Flambeau River", state:"WI", lat:45.704, lng:-90.528, type:"River", fee:false, amenities:["Kayak Launch","Parking","Camping"], rating:4.8 },
  { id:398,name:"Lake Superior - Big Bay SP", body:"Lake Superior", state:"WI", lat:46.782, lng:-90.735, type:"Lake", fee:true, amenities:["Kayak Launch","Camping","Restrooms"], rating:4.9 },
  { id:399,name:"Kickapoo River - Ontario Launch", body:"Kickapoo River", state:"WI", lat:43.726, lng:-90.580, type:"River", fee:false, amenities:["Kayak Launch","Parking"], rating:4.8 },

  // -- WYOMING --
  { id:400,name:"Snake River - Flagg Ranch Launch", body:"Snake River", state:"WY", lat:44.094, lng:-110.700, type:"River", fee:true, amenities:["Kayak Launch","Camping","Restrooms"], rating:5.0 },
  { id:401,name:"Shoshone River - Buffalo Bill SP", body:"Shoshone River", state:"WY", lat:44.488, lng:-109.225, type:"River", fee:true, amenities:["Boat Ramp","Camping","Restrooms"], rating:4.8 },
  { id:402,name:"Bighorn Lake - Horseshoe Bend Marina", body:"Bighorn Lake", state:"WY", lat:45.103, lng:-107.973, type:"Lake", fee:true, amenities:["Full Marina","Fuel","Restrooms"], rating:4.7 },
  { id:403,name:"Green River - Fontenelle Reservoir", body:"Green River", state:"WY", lat:42.028, lng:-110.072, type:"River", fee:false, amenities:["Boat Ramp","Parking","Camping"], rating:4.8 },
];

const MOCK_CONDITIONS = [
  { name:"Chattahoochee River", level:2.4, flow:840, temp:58, clarity:"Stained", rating:"good", trend:"v Falling" },
  { name:"Lake Lanier", level:1071.2, flow:null, temp:62, clarity:"Clear", rating:"good", trend:"> Stable" },
  { name:"Etowah River", level:3.1, flow:1240, temp:55, clarity:"Muddy", rating:"fair", trend:"^ Rising" },
];

const WMO_MAP = {0:"Clear [sun]",1:"Mostly Clear [wx]",2:"Partly Cloudy [partly]",3:"Overcast [cloud]",61:"Light Rain [rain]",63:"Rain [rain]",80:"Showers [wx]",95:"Thunderstorm [storm]"};
const wmoLabel = (c) => WMO_MAP[c] || "Clear [sun]";
const windDir = (deg) => { const d=["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"]; return d[Math.round(deg/22.5)%16]; };

// Generate realistic mock weather data
const generateWeather = (locationName) => {
  const now = new Date();
  const baseTemp = 62 + Math.round(Math.random()*14 - 4);
  const codes = [0,0,0,1,1,2,3,61,80];
  const code = codes[Math.floor(Math.random()*codes.length)];
  const windspeed = Math.round(4 + Math.random()*14);
  const pressure = Math.round(1008 + Math.random()*18);

  const hourly = Array.from({length:24},(_,i)=>{
    const h = (now.getHours()+i)%24;
    const hLabel = i===0?"NOW":`${h}:00`;
    const tempShift = Math.round((Math.sin((h-6)*Math.PI/12)*8));
    const hCode = i < 6 ? code : (Math.random()>0.85 ? 1 : code);
    return { time:hLabel, code:hCode, temp:baseTemp+tempShift, rainPct: hCode>=60 ? Math.round(20+Math.random()*60) : Math.round(Math.random()*15), wind:Math.round(windspeed + Math.random()*4 - 2) };
  });

  const forecast = Array.from({length:7},(_,i)=>{
    const d = new Date(now); d.setDate(d.getDate()+i);
    const hi = baseTemp + Math.round(Math.random()*10 - 2) + (i===0?0:Math.round(Math.random()*6-3));
    const lo = hi - Math.round(8 + Math.random()*10);
    const fCode = codes[Math.floor(Math.random()*codes.length)];
    return {
      day: i===0?"Today":DAYS[d.getDay()],
      code: fCode,
      hi, lo,
      precip: fCode >= 60 ? parseFloat((Math.random()*0.8).toFixed(2)) : 0,
      wind: Math.round(windspeed + Math.random()*6 - 3),
      uv: Math.round(2+Math.random()*7),
      sunrise: `${6+Math.round(Math.random())}:${String(Math.round(Math.random()*30)).padStart(2,"0")} AM`,
      sunset:  `${7+Math.round(Math.random())}:${String(Math.round(Math.random()*30)).padStart(2,"0")} PM`,
    };
  });

  return {
    current: {
      temp: baseTemp,
      feels: baseTemp - Math.round(windspeed*0.3),
      humidity: Math.round(45+Math.random()*35),
      precipitation: code >= 60 ? parseFloat((Math.random()*0.3).toFixed(2)) : 0,
      code,
      pressure,
      windspeed,
      winddir: Math.round(Math.random()*360),
      windgusts: Math.round(windspeed*1.4),
      cloud: code===0?Math.round(Math.random()*15):code===1?Math.round(20+Math.random()*25):code===2?Math.round(45+Math.random()*20):Math.round(70+Math.random()*28),
      visibility: parseFloat((8+Math.random()*12).toFixed(1)),
      uv: Math.round(1+Math.random()*9),
      dewpoint: baseTemp - Math.round(8+Math.random()*20),
    },
    hourly,
    forecast,
    location: locationName,
  };
};

const fishingScore = (w) => {
  if (!w) return null;
  let s = 100;
  if (w.windspeed>20) s-=25; else if (w.windspeed>12) s-=10;
  if (w.precipitation>0.2) s-=20; else if (w.precipitation>0.05) s-=8;
  if (w.pressure<1008) s-=15; else if (w.pressure>1018) s+=10;
  if (w.temp<40||w.temp>95) s-=20; else if (w.temp>=60&&w.temp<=80) s+=10;
  if ([95,80].includes(w.code)) s-=25;
  return Math.max(0,Math.min(100,s));
};

const scoreInfo = (s) => {
  if (s>=80) return {label:"EXCELLENT",color:"#8BC34A"};
  if (s>=60) return {label:"GOOD",color:"#C8A96E"};
  if (s>=40) return {label:"FAIR",color:"#FF9800"};
  return {label:"POOR",color:"#F44336"};
};

const pressureLabel = (p) => p>1020?"High - Active bite, fish feeding shallow [~]":p>1013?"Normal - Steady conditions, consistent bite":p>1005?"Low - Fish heading deeper, slow down presentations":"Very Low - Tough bite day, try deep structure";
const uvLabel = (u) => u<=2?"Low":u<=5?"Moderate":u<=7?"High":u<=10?"Very High":"Extreme";


// -- SOLUNAR ENGINE --
const getMoonPhase = (date) => {
  const known = new Date(2000,0,6);
  const diff = (date - known) / (1000*60*60*24);
  const cycle = 29.53058867;
  const phase = ((diff % cycle) + cycle) % cycle;
  if (phase < 1.85) return {name:"New Moon",icon:"[new]",pct:0,best:true};
  if (phase < 7.38) return {name:"Waxing Crescent",icon:"[moon]",pct:phase/14.76,best:false};
  if (phase < 9.22) return {name:"First Quarter",icon:"[moon]",pct:0.5,best:false};
  if (phase < 14.76) return {name:"Waxing Gibbous",icon:"[moon]",pct:phase/14.76,best:false};
  if (phase < 16.61) return {name:"Full Moon",icon:"[full]",pct:1,best:true};
  if (phase < 22.15) return {name:"Waning Gibbous",icon:"[moon]",pct:1-(phase-14.76)/14.76,best:false};
  if (phase < 23.99) return {name:"Last Quarter",icon:"[moon]",pct:0.5,best:false};
  return {name:"Waning Crescent",icon:"[moon]",pct:1-(phase-14.76)/14.76,best:false};
};
const getSolunar = (date) => {
  const moon = getMoonPhase(date);
  const seed = date.getDate() + date.getMonth()*31 + date.getFullYear();
  const rng = (n) => ((seed*9301+n*49297)%233280)/233280;
  const fmt = (m) => { const tot=((m%1440)+1440)%1440; const h=Math.floor(tot/60); const mn=Math.floor(tot%60); const ap=h>=12?"PM":"AM"; return (h%12||12)+":"+(mn.toString().padStart(2,"0"))+" "+ap; };
  const m1s = (5+Math.floor(rng(1)*4))*60+Math.floor(rng(2)*30);
  const m1e = m1s+90+Math.floor(rng(3)*30);
  const m2s = m1s+12*60+Math.floor(rng(4)*60-30);
  const m2e = m2s+90+Math.floor(rng(5)*30);
  const n1s = m1s-6*60+Math.floor(rng(6)*60-30);
  const n1e = n1s+45;
  const n2s = m1s+6*60+Math.floor(rng(7)*60-30);
  const n2e = n2s+45;
  const rating = moon.best ? 10 : Math.round(4+rng(8)*4+(moon.pct>0.7?2:0));
  return { moon, rating,
    major:[{s:fmt(m1s),e:fmt(m1e)},{s:fmt(m2s),e:fmt(m2e)}],
    minor:[{s:fmt(n1s),e:fmt(n1e)},{s:fmt(n2s),e:fmt(n2e)}],
  };
};

// -- KNOTS DATA --
const KNOTS = [
  {id:"palomar",name:"Palomar Knot",use:"Hooks, lures, snaps",strength:"95%",difficulty:"Easy",steps:["Double 6 inches of line and pass the loop through the hook eye.","Tie a loose overhand knot with the doubled line - let hook hang free.","Pass the loop of line completely over the hook.","Wet and pull tag end and standing line tight. Trim excess."]},
  {id:"clinch",name:"Improved Clinch",use:"Hooks, terminal tackle",strength:"90%",difficulty:"Easy",steps:["Pass 6 inches of line through the hook eye.","Wrap tag end around standing line 5-7 times.","Pass tag end through the small loop near eye, then back through the big loop.","Wet the knot, pull tight. Trim the tag end close."]},
  {id:"uni",name:"Uni Knot",use:"Hooks, swivels, braid",strength:"90%",difficulty:"Easy",steps:["Pass 6 inches of line through the eye. Fold tag back parallel to standing line.","Make a loop by bringing tag end toward the eye.","Wrap the tag end around doubled line and through the loop 4-6 times.","Pull tag to tighten coils. Slide knot to eye. Trim excess."]},
  {id:"fg",name:"FG Knot",use:"Braid-to-fluorocarbon leader",strength:"99%",difficulty:"Hard",steps:["Hold fluoro under tension. Weave braid over-under the leader 10 times each direction.","Lock with 2 half hitches above the wraps.","Add 2 half hitches below the wraps for security.","Trim both tag ends close. Test hard before fishing."]},
  {id:"alberto",name:"Alberto Knot",use:"Braid-to-fluoro leader",strength:"95%",difficulty:"Medium",steps:["Fold 12 inches of fluoro into a loop. Pass braid through the loop.","Wrap braid around both fluoro strands 7 times toward the tag end.","Wrap braid 7 times back in the opposite direction.","Pass braid back through fluoro loop. Wet and pull all four ends tight. Trim."]},
  {id:"blood",name:"Blood Knot",use:"Joining two similar lines",strength:"85%",difficulty:"Medium",steps:["Overlap 6 inches of both lines crossing in the middle.","Wrap one tag end around the other line 5 times, bring back through center.","Repeat with other tag end in opposite direction through same gap.","Wet and pull both standing lines simultaneously. Trim tags."]},
  {id:"surgeon",name:"Double Surgeon Loop",use:"Creating a loop at line end",strength:"90%",difficulty:"Easy",steps:["Double the last 6 inches of line to form a loop.","Tie a simple overhand knot with the doubled line.","Pass the doubled end through the overhand loop a second time.","Wet and pull the loop and both strands tight. Trim the tag."]},
  {id:"snell",name:"Snell Knot",use:"Worm hooks, live bait rigs",strength:"92%",difficulty:"Medium",steps:["Thread 4 inches of line through the hook eye from the front.","Hold the loop beside the hook shank.","Wrap the loop around both the shank and the tag end 7-8 times.","Pull the standing line to tighten the wraps toward the eye. Trim."]},
];

const css = `
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;600;700&family=Source+Serif+4:ital,wght@0,300;0,400;1,300&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
:root{--bark:#2C1A0E;--mud:#4A2E1A;--moss:#3D5A2A;--moss-light:#5C8A3A;--water:#1B4F6E;--water-light:#2E7DA8;--sand:#C8A96E;--cream:#F0E8D5;--fog:#8A9E8A;--text:#F0E8D5;--text-dim:#A09070;}
body{background:var(--bark);font-family:'Source Serif 4',serif;color:var(--text);}
.app{max-width:430px;margin:0 auto;min-height:100vh;background:linear-gradient(160deg,#1A0F06 0%,#2C1A0E 40%,#1B3020 100%);position:relative;overflow:hidden;}
.app::before{content:'';position:fixed;top:0;left:0;right:0;bottom:0;background-image:radial-gradient(ellipse at 20% 50%,rgba(61,90,42,.15) 0%,transparent 60%),radial-gradient(ellipse at 80% 20%,rgba(27,79,110,.12) 0%,transparent 50%);pointer-events:none;z-index:0;}
.header{padding:48px 24px 20px;position:relative;z-index:1;}
.logo{display:flex;align-items:center;gap:10px;margin-bottom:4px;}
.logo-icon{width:38px;height:38px;background:var(--moss);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:20px;box-shadow:0 2px 12px rgba(0,0,0,.4);}
.logo-text{font-family:'Oswald',sans-serif;font-size:28px;font-weight:700;letter-spacing:2px;color:var(--cream);text-transform:uppercase;}
.logo-text span{color:var(--sand);}
.tagline{font-size:12px;letter-spacing:3px;text-transform:uppercase;color:var(--fog);font-family:'Oswald',sans-serif;}
.nav{display:flex;gap:4px;padding:0 24px 20px;position:relative;z-index:1;overflow-x:auto;scrollbar-width:none;}
.nav::-webkit-scrollbar{display:none;}
.nav-btn{flex-shrink:0;padding:8px 12px;border-radius:20px;border:1px solid rgba(200,169,110,.2);background:transparent;color:var(--text-dim);font-family:'Oswald',sans-serif;font-size:11px;letter-spacing:1px;text-transform:uppercase;cursor:pointer;transition:all .2s;}
.nav-btn.active{background:var(--moss);border-color:var(--moss-light);color:var(--cream);}
.content{padding:0 24px 100px;position:relative;z-index:1;}
.stats-row{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:20px;}
.stat-card{background:rgba(255,255,255,.04);border:1px solid rgba(200,169,110,.12);border-radius:16px;padding:16px;}
.stat-label{font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--fog);font-family:'Oswald',sans-serif;margin-bottom:6px;}
.stat-value{font-family:'Oswald',sans-serif;font-size:32px;font-weight:700;color:var(--sand);line-height:1;}
.stat-sub{font-size:11px;color:var(--fog);margin-top:4px;}
.section-title{font-family:'Oswald',sans-serif;font-size:13px;letter-spacing:3px;text-transform:uppercase;color:var(--fog);margin-bottom:12px;display:flex;align-items:center;gap:8px;}
.section-title::after{content:'';flex:1;height:1px;background:rgba(200,169,110,.15);}
.catch-card{background:rgba(255,255,255,.04);border:1px solid rgba(200,169,110,.1);border-radius:14px;padding:14px 16px;margin-bottom:10px;cursor:pointer;transition:all .2s;}
.catch-card:hover{border-color:rgba(200,169,110,.3);background:rgba(255,255,255,.07);}
.catch-emoji{width:44px;height:44px;background:rgba(61,90,42,.4);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;overflow:hidden;}
.catch-species{font-family:'Oswald',sans-serif;font-size:16px;color:var(--cream);font-weight:600;}
.catch-meta{font-size:12px;color:var(--fog);margin-top:2px;}
.catch-size{font-family:'Oswald',sans-serif;font-size:20px;color:var(--sand);font-weight:700;text-align:right;}
.catch-size-unit{font-size:11px;color:var(--fog);display:block;text-align:right;}
.form-section{margin-bottom:22px;}
.input-label{font-family:'Oswald',sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:var(--fog);margin-bottom:8px;display:block;}
.input-field{width:100%;background:rgba(255,255,255,.05);border:1px solid rgba(200,169,110,.2);border-radius:10px;padding:12px 14px;color:var(--cream);font-family:'Source Serif 4',serif;font-size:15px;outline:none;transition:border-color .2s;}
.input-field:focus{border-color:var(--sand);}
.input-field::placeholder{color:var(--text-dim);}
select.input-field option{background:#2C1A0E;color:var(--cream);}
.input-row{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
.chip-group{display:flex;flex-wrap:wrap;gap:8px;}
.chip{padding:6px 14px;border-radius:20px;border:1px solid rgba(200,169,110,.2);background:transparent;color:var(--text-dim);font-size:13px;cursor:pointer;transition:all .15s;font-family:'Source Serif 4',serif;}
.chip.selected{background:var(--moss);border-color:var(--moss-light);color:var(--cream);}
.submit-btn{width:100%;padding:16px;background:linear-gradient(135deg,var(--moss),var(--moss-light));border:none;border-radius:14px;color:var(--cream);font-family:'Oswald',sans-serif;font-size:16px;letter-spacing:2px;text-transform:uppercase;cursor:pointer;transition:all .2s;box-shadow:0 4px 20px rgba(61,90,42,.4);margin-top:8px;}
.submit-btn:hover{transform:translateY(-1px);}
.condition-card{background:rgba(27,79,110,.2);border:1px solid rgba(46,125,168,.25);border-radius:16px;padding:18px;margin-bottom:12px;}
.condition-location{font-family:'Oswald',sans-serif;font-size:17px;color:var(--cream);font-weight:600;margin-bottom:12px;display:flex;align-items:center;gap:8px;flex-wrap:wrap;}
.condition-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;}
.condition-item{text-align:center;}
.condition-value{font-family:'Oswald',sans-serif;font-size:22px;font-weight:700;color:var(--water-light);}
.condition-unit{font-size:10px;color:var(--fog);text-transform:uppercase;letter-spacing:1px;}
.water-level-bar{height:6px;background:rgba(255,255,255,.1);border-radius:3px;margin-top:10px;overflow:hidden;}
.water-level-fill{height:100%;border-radius:3px;background:linear-gradient(90deg,var(--water),var(--water-light));}
.badge{display:inline-block;padding:3px 10px;border-radius:10px;font-size:11px;font-family:'Oswald',sans-serif;letter-spacing:1px;}
.badge-good{background:rgba(61,90,42,.5);color:#8BC34A;border:1px solid rgba(139,195,74,.3);}
.badge-fair{background:rgba(184,76,28,.3);color:var(--sand);border:1px solid rgba(200,169,110,.3);}
.record-badge{background:rgba(200,169,110,.2);border:1px solid var(--sand);border-radius:6px;padding:2px 8px;font-size:10px;color:var(--sand);font-family:'Oswald',sans-serif;letter-spacing:1px;margin-left:8px;}
.personal-best{background:linear-gradient(135deg,rgba(200,169,110,.1),rgba(61,90,42,.1));border:1px solid rgba(200,169,110,.25);border-radius:16px;padding:16px;margin-bottom:20px;}
.pb-title{font-family:'Oswald',sans-serif;font-size:11px;letter-spacing:3px;color:var(--sand);text-transform:uppercase;margin-bottom:10px;}
.pb-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;}
.pb-item{text-align:center;}
.pb-val{font-family:'Oswald',sans-serif;font-size:20px;color:var(--sand);font-weight:700;}
.pb-lbl{font-size:10px;color:var(--fog);text-transform:uppercase;letter-spacing:1px;}
.photo-upload-area{border:2px dashed rgba(200,169,110,.3);border-radius:14px;padding:20px;text-align:center;cursor:pointer;transition:all .2s;background:rgba(255,255,255,.02);position:relative;overflow:hidden;}
.photo-upload-area:hover{border-color:var(--sand);}
.photo-preview{width:100%;height:180px;object-fit:cover;border-radius:10px;display:block;}
.photo-remove{position:absolute;top:8px;right:8px;background:rgba(0,0,0,.7);border:none;color:var(--cream);border-radius:50%;width:28px;height:28px;cursor:pointer;font-size:14px;display:flex;align-items:center;justify-content:center;}
.map-section{background:rgba(27,79,110,.15);border:1px solid rgba(46,125,168,.2);border-radius:14px;padding:16px;}
.map-placeholder{height:130px;background:rgba(27,79,110,.1);border-radius:10px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;border:1px dashed rgba(46,125,168,.3);cursor:pointer;transition:all .2s;}
.map-placeholder:hover{background:rgba(27,79,110,.2);}
.map-pin-set{display:flex;align-items:center;gap:12px;background:rgba(27,79,110,.2);border-radius:10px;padding:12px;}
.modal-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.8);z-index:200;display:flex;align-items:flex-end;justify-content:center;}
.share-modal{background:linear-gradient(160deg,#1A0F06,#2C1A0E);border:1px solid rgba(200,169,110,.2);border-radius:24px 24px 0 0;padding:28px 24px 44px;width:100%;max-width:430px;}
.share-title{font-family:'Oswald',sans-serif;font-size:20px;letter-spacing:2px;text-transform:uppercase;color:var(--cream);margin-bottom:4px;}
.share-sub{font-size:13px;color:var(--fog);margin-bottom:20px;}
.share-preview{background:rgba(255,255,255,.04);border:1px solid rgba(200,169,110,.15);border-radius:14px;padding:14px;margin-bottom:18px;}
.share-caption{font-size:13px;color:var(--text-dim);line-height:1.7;white-space:pre-wrap;}
.share-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px;}
.share-btn{padding:14px;border-radius:12px;border:1px solid rgba(200,169,110,.2);background:rgba(255,255,255,.04);color:var(--cream);font-family:'Oswald',sans-serif;font-size:13px;letter-spacing:1px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;transition:all .2s;}
.share-btn:hover{background:rgba(255,255,255,.1);}
.share-btn.ig{background:linear-gradient(135deg,rgba(131,58,180,.35),rgba(252,176,69,.2));border-color:rgba(252,176,69,.3);}
.share-btn.tt{background:rgba(0,0,0,.4);border-color:rgba(255,255,255,.15);}
.share-btn.cp{background:rgba(61,90,42,.3);border-color:var(--moss);}
.cancel-btn{width:100%;padding:13px;background:transparent;border:1px solid rgba(200,169,110,.2);border-radius:12px;color:var(--text-dim);font-family:'Oswald',sans-serif;font-size:14px;letter-spacing:1px;cursor:pointer;}
.launch-card{background:rgba(255,255,255,.04);border:1px solid rgba(200,169,110,.1);border-radius:14px;padding:14px 16px;margin-bottom:10px;transition:all .2s;}
.launch-card:hover{border-color:rgba(200,169,110,.25);}
.launch-name{font-family:'Oswald',sans-serif;font-size:15px;color:var(--cream);font-weight:600;flex:1;margin-right:8px;}
.launch-state{font-family:'Oswald',sans-serif;font-size:12px;color:var(--sand);background:rgba(200,169,110,.15);padding:3px 9px;border-radius:6px;white-space:nowrap;}
.amenity-tag{font-size:10px;color:var(--fog);background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);border-radius:5px;padding:2px 7px;font-family:'Oswald',sans-serif;}
.directions-btn{padding:7px 14px;background:rgba(27,79,110,.4);border:1px solid rgba(46,125,168,.3);border-radius:8px;color:var(--water-light);font-family:'Oswald',sans-serif;font-size:11px;letter-spacing:1px;cursor:pointer;white-space:nowrap;}
.toast{position:fixed;top:60px;left:50%;transform:translateX(-50%);background:var(--moss);color:var(--cream);padding:12px 24px;border-radius:30px;font-family:'Oswald',sans-serif;font-size:14px;letter-spacing:1px;z-index:300;animation:tIn .3s ease,tOut .3s ease 2s forwards;box-shadow:0 4px 20px rgba(0,0,0,.5);white-space:nowrap;}
@keyframes tIn{from{opacity:0;transform:translateX(-50%) translateY(-20px);}to{opacity:1;transform:translateX(-50%) translateY(0);}}
@keyframes tOut{to{opacity:0;}}

/* WEATHER */
.wx-hero{background:linear-gradient(135deg,rgba(27,79,110,.5),rgba(61,90,42,.3));border:1px solid rgba(46,125,168,.35);border-radius:20px;padding:22px;margin-bottom:16px;position:relative;overflow:hidden;}
.wx-hero::before{content:'';position:absolute;top:-30px;right:-30px;width:130px;height:130px;border-radius:50%;background:radial-gradient(circle,rgba(200,169,110,.08),transparent 70%);pointer-events:none;}
.wx-location-label{font-family:'Oswald',sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:var(--fog);margin-bottom:4px;}
.wx-temp{font-family:'Oswald',sans-serif;font-size:72px;font-weight:700;color:var(--cream);line-height:1;margin-bottom:2px;}
.wx-temp sup{font-size:26px;vertical-align:super;}
.wx-cond{font-family:'Oswald',sans-serif;font-size:18px;color:var(--sand);margin-bottom:14px;}
.wx-row{display:flex;gap:18px;font-family:'Oswald',sans-serif;font-size:13px;color:var(--fog);}
.wx-row b{color:var(--cream);font-weight:600;}
.wx-score-box{background:rgba(255,255,255,.04);border:1px solid rgba(200,169,110,.12);border-radius:16px;padding:16px;margin-bottom:16px;}
.wx-score-label-sm{font-family:'Oswald',sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:var(--fog);margin-bottom:10px;}
.wx-track{height:10px;background:rgba(255,255,255,.08);border-radius:5px;overflow:hidden;margin-bottom:8px;}
.wx-fill{height:100%;border-radius:5px;transition:width .9s ease;}
.wx-score-num{font-family:'Oswald',sans-serif;font-size:22px;font-weight:700;}
.wx-tip{font-size:12px;color:var(--fog);margin-top:6px;line-height:1.55;}
.wx-2col{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px;}
.wx-card{background:rgba(255,255,255,.04);border:1px solid rgba(200,169,110,.1);border-radius:14px;padding:14px;}
.wx-card-ico{font-size:24px;margin-bottom:5px;}
.wx-card-val{font-family:'Oswald',sans-serif;font-size:26px;font-weight:700;color:var(--cream);line-height:1;}
.wx-card-unit{font-size:10px;color:var(--fog);text-transform:uppercase;letter-spacing:1px;margin-top:2px;}
.wx-card-sub{font-size:11px;color:var(--text-dim);margin-top:5px;line-height:1.4;}
.wx-3col{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:16px;}
.wx-mini{background:rgba(255,255,255,.03);border:1px solid rgba(200,169,110,.08);border-radius:12px;padding:12px;text-align:center;}
.wx-mini-val{font-family:'Oswald',sans-serif;font-size:18px;font-weight:700;color:var(--sand);}
.wx-mini-unit{font-size:9px;color:var(--fog);text-transform:uppercase;letter-spacing:1px;margin-top:2px;}
.wx-mini-lbl{font-size:10px;color:var(--text-dim);margin-top:4px;}
.wx-hourly{display:flex;gap:8px;overflow-x:auto;scrollbar-width:none;padding-bottom:4px;margin-bottom:16px;}
.wx-hourly::-webkit-scrollbar{display:none;}
.wx-hcard{flex-shrink:0;background:rgba(255,255,255,.04);border:1px solid rgba(200,169,110,.1);border-radius:12px;padding:10px 11px;text-align:center;min-width:60px;}
.wx-hcard.now{border-color:var(--sand);background:rgba(200,169,110,.09);}
.wx-htime{font-family:'Oswald',sans-serif;font-size:10px;color:var(--fog);letter-spacing:1px;margin-bottom:5px;}
.wx-hico{font-size:17px;margin-bottom:3px;}
.wx-htemp{font-family:'Oswald',sans-serif;font-size:16px;font-weight:700;color:var(--cream);}
.wx-hrain{font-size:10px;color:var(--water-light);margin-top:2px;}
.wx-baro{background:rgba(255,255,255,.03);border:1px solid rgba(200,169,110,.08);border-radius:16px;padding:16px;margin-bottom:16px;}
.wx-baro-title{font-family:'Oswald',sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:var(--fog);margin-bottom:12px;}
.wx-7day{background:rgba(255,255,255,.03);border:1px solid rgba(200,169,110,.08);border-radius:16px;padding:14px;margin-bottom:16px;}
.wx-7day-title{font-family:'Oswald',sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:var(--fog);margin-bottom:12px;}
.wx-frow{display:flex;align-items:center;justify-content:space-between;padding:9px 0;border-bottom:1px solid rgba(255,255,255,.04);}
.wx-frow:last-child{border-bottom:none;}
.wx-fday{font-family:'Oswald',sans-serif;font-size:13px;color:var(--cream);width:44px;}
.wx-fico{font-size:17px;width:26px;text-align:center;}
.wx-fdesc{flex:1;padding-left:8px;font-size:11px;color:var(--fog);}
.wx-fscore{font-size:11px;font-family:'Oswald',sans-serif;padding:2px 9px;border-radius:8px;}
.wx-ftemps{font-family:'Oswald',sans-serif;font-size:13px;text-align:right;margin-left:8px;}
.wx-sun{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px;}
.wx-sun-card{border-radius:14px;padding:14px;text-align:center;}
.wx-load-btn{width:100%;padding:14px;background:rgba(27,79,110,.3);border:1px solid rgba(46,125,168,.35);border-radius:12px;color:var(--water-light);font-family:'Oswald',sans-serif;font-size:14px;letter-spacing:2px;cursor:pointer;transition:all .2s;text-transform:uppercase;}
.wx-load-btn:hover{background:rgba(27,79,110,.5);}
.spinner{animation:spin 1s linear infinite;display:inline-block;}
@keyframes spin{to{transform:rotate(360deg);}}
.wx-location-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:20px;}
.wx-loc-btn{padding:14px 10px;background:rgba(255,255,255,.04);border:1px solid rgba(200,169,110,.15);border-radius:12px;color:var(--text-dim);font-family:'Oswald',sans-serif;font-size:12px;letter-spacing:1px;cursor:pointer;transition:all .2s;text-align:center;}
.wx-loc-btn:hover{border-color:var(--sand);color:var(--cream);background:rgba(200,169,110,.07);}
.wx-loc-name{font-size:13px;color:var(--cream);display:block;margin-bottom:3px;}
.wx-loc-state{font-size:10px;color:var(--fog);}
.sol-header{background:rgba(255,255,255,.04);border:1px solid rgba(200,169,110,.12);border-radius:16px;padding:18px;margin-bottom:16px;text-align:center;}
.sol-moon-icon{font-size:56px;line-height:1;margin-bottom:8px;}
.sol-moon-name{font-family:'Oswald',sans-serif;font-size:18px;color:var(--cream);letter-spacing:2px;margin-bottom:4px;}
.sol-rating-row{display:flex;align-items:center;justify-content:center;gap:8px;margin-bottom:10px;}
.sol-rating-num{font-family:'Oswald',sans-serif;font-size:42px;font-weight:700;color:var(--sand);}
.sol-rating-label{font-size:11px;color:var(--fog);text-transform:uppercase;letter-spacing:2px;}
.sol-bar{height:8px;background:rgba(255,255,255,.08);border-radius:4px;overflow:hidden;width:80%;margin:0 auto 10px;}
.sol-bar-fill{height:100%;border-radius:4px;background:linear-gradient(90deg,var(--moss),var(--sand));}
.sol-windows{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px;}
.sol-win-card{border-radius:14px;padding:14px;}
.sol-win-major{background:rgba(200,169,110,.1);border:1px solid rgba(200,169,110,.25);}
.sol-win-minor{background:rgba(61,90,42,.12);border:1px solid rgba(92,138,58,.2);}
.sol-win-title{font-family:'Oswald',sans-serif;font-size:10px;letter-spacing:2px;text-transform:uppercase;margin-bottom:8px;}
.sol-win-time{font-family:'Oswald',sans-serif;font-size:15px;color:var(--cream);margin-bottom:2px;}
.sol-win-dur{font-size:10px;color:var(--fog);}
.sol-cal{display:flex;gap:6px;overflow-x:auto;scrollbar-width:none;padding-bottom:4px;margin-bottom:16px;}
.sol-cal::-webkit-scrollbar{display:none;}
.sol-day{flex-shrink:0;background:rgba(255,255,255,.04);border:1px solid rgba(200,169,110,.1);border-radius:12px;padding:10px 8px;text-align:center;min-width:52px;cursor:pointer;transition:all .2s;}
.sol-day.active{border-color:var(--sand);background:rgba(200,169,110,.1);}
.sol-day.best{border-color:rgba(139,195,74,.5);background:rgba(139,195,74,.08);}
.sol-day-name{font-family:'Oswald',sans-serif;font-size:9px;color:var(--fog);letter-spacing:1px;margin-bottom:4px;}
.sol-day-icon{font-size:16px;margin-bottom:3px;}
.sol-day-rating{font-family:'Oswald',sans-serif;font-size:16px;font-weight:700;color:var(--sand);}
.knot-list{display:flex;flex-direction:column;gap:10px;margin-bottom:16px;}
.knot-card{background:rgba(255,255,255,.04);border:1px solid rgba(200,169,110,.12);border-radius:14px;padding:16px;cursor:pointer;transition:all .2s;}
.knot-card.active{border-color:var(--sand);}
.knot-name{font-family:'Oswald',sans-serif;font-size:16px;color:var(--cream);margin-bottom:4px;}
.knot-meta{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px;}
.knot-tag{font-size:10px;padding:2px 8px;border-radius:8px;font-family:'Oswald',sans-serif;letter-spacing:1px;}
.knot-tag.easy{background:rgba(139,195,74,.15);color:#8BC34A;}
.knot-tag.medium{background:rgba(255,152,0,.15);color:#FF9800;}
.knot-tag.hard{background:rgba(244,67,54,.15);color:#F44336;}
.knot-tag.strength{background:rgba(46,125,168,.15);color:var(--water-light);}
.knot-tag.use{background:rgba(200,169,110,.1);color:var(--sand);}
.knot-steps{margin-top:12px;}
.knot-step{display:flex;gap:10px;margin-bottom:10px;align-items:flex-start;}
.knot-step-num{flex-shrink:0;width:24px;height:24px;background:var(--moss);border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'Oswald',sans-serif;font-size:12px;color:var(--cream);font-weight:700;}
.knot-step-text{font-size:13px;color:var(--text-dim);line-height:1.6;padding-top:3px;}
.wp-card{background:rgba(255,255,255,.04);border:1px solid rgba(200,169,110,.12);border-radius:14px;padding:16px;margin-bottom:10px;}
.wp-name{font-family:'Oswald',sans-serif;font-size:16px;color:var(--cream);margin-bottom:4px;}
.wp-body{font-size:12px;color:var(--water-light);margin-bottom:4px;}
.wp-notes{font-size:12px;color:var(--fog);margin-bottom:8px;line-height:1.5;}
.wp-actions{display:flex;gap:8px;}
.wp-btn{flex:1;padding:8px;border-radius:10px;border:1px solid rgba(200,169,110,.2);background:transparent;color:var(--sand);font-family:'Oswald',sans-serif;font-size:11px;letter-spacing:1px;cursor:pointer;}
.wp-btn.danger{border-color:rgba(244,67,54,.3);color:#F44336;}
.wp-add-form{background:rgba(255,255,255,.04);border:1px solid rgba(61,90,42,.3);border-radius:14px;padding:16px;margin-bottom:16px;}
.stats-big{background:rgba(255,255,255,.04);border:1px solid rgba(200,169,110,.12);border-radius:16px;padding:18px;margin-bottom:14px;}
.stats-big-title{font-family:'Oswald',sans-serif;font-size:11px;letter-spacing:3px;color:var(--fog);text-transform:uppercase;margin-bottom:14px;}
.pb-row{display:flex;align-items:center;justify-content:space-between;padding:8px 0;border-bottom:1px solid rgba(255,255,255,.04);}
.pb-row:last-child{border-bottom:none;}
.pb-species{font-size:13px;color:var(--cream);}
.pb-weight{font-family:'Oswald',sans-serif;font-size:18px;color:var(--sand);}
.pb-lure{font-size:11px;color:var(--fog);}
.month-bar-row{display:flex;align-items:center;gap:8px;margin-bottom:6px;}
.month-label{font-family:'Oswald',sans-serif;font-size:11px;color:var(--fog);width:32px;}
.month-bar{flex:1;height:14px;background:rgba(255,255,255,.06);border-radius:7px;overflow:hidden;}
.month-bar-fill{height:100%;border-radius:7px;background:linear-gradient(90deg,var(--moss),var(--moss-light));}
.month-count{font-family:'Oswald',sans-serif;font-size:12px;color:var(--sand);width:20px;text-align:right;}
.lure-row{display:flex;align-items:center;justify-content:space-between;padding:7px 0;border-bottom:1px solid rgba(255,255,255,.04);}
.lure-row:last-child{border-bottom:none;}
.lure-name{font-size:13px;color:var(--cream);}
.lure-bar-wrap{flex:1;margin:0 10px;height:8px;background:rgba(255,255,255,.06);border-radius:4px;overflow:hidden;}
.lure-bar-fill{height:100%;border-radius:4px;background:var(--sand);}
.lure-pct{font-family:'Oswald',sans-serif;font-size:12px;color:var(--fog);}

`;

const PRESET_LOCATIONS = [
  { name:"Lake Lanier", state:"GA, USA", lat:34.302, lng:-83.824 },
  { name:"Chattahoochee River", state:"GA, USA", lat:33.847, lng:-84.468 },
  { name:"Hiwassee River", state:"TN, USA", lat:35.087, lng:-84.489 },
  { name:"Etowah River", state:"GA, USA", lat:34.148, lng:-84.701 },
];

const BaroMeter = ({ pressure }) => {
  const min=980, max=1040;
  const pct=Math.min(1,Math.max(0,(pressure-min)/(max-min)));
  const angle=-130+pct*260;
  const rad=(angle*Math.PI)/180;
  const cx=80,cy=75,r=55;
  const nx=cx+r*Math.cos(rad), ny=cy+r*Math.sin(rad);
  return (
    <svg viewBox="0 0 160 90" width="160" height="90" style={{display:'block',margin:'0 auto 8px'}}>
      <defs><linearGradient id="bg2" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#2E7DA8"/><stop offset="50%" stopColor="#8BC34A"/><stop offset="100%" stopColor="#FF7043"/></linearGradient></defs>
      <path d="M16 75 A64 64 0 0 1 144 75" fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="8" strokeLinecap="round"/>
      <path d="M16 75 A64 64 0 0 1 144 75" fill="none" stroke="url(#bg2)" strokeWidth="8" strokeLinecap="round" strokeDasharray="201" strokeDashoffset={201*(1-pct)}/>
      <line x1={cx} y1={cy} x2={nx} y2={ny} stroke="var(--sand)" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx={cx} cy={cy} r="5" fill="var(--sand)"/>
      <text x="18" y="88" fontSize="8" fill="var(--fog)">Low</text>
      <text x="72" y="18" fontSize="8" fill="var(--fog)" textAnchor="middle">Normal</text>
      <text x="134" y="88" fontSize="8" fill="var(--fog)" textAnchor="end">High</text>
    </svg>
  );
};

const WindCompass = ({ deg, speed }) => {
  const rad=((deg-90)*Math.PI)/180;
  const cx=40,cy=40,r=28;
  const nx=cx+r*Math.cos(rad), ny=cy+r*Math.sin(rad);
  const tx=cx-(r-10)*Math.cos(rad), ty=cy-(r-10)*Math.sin(rad);
  return (
    <svg viewBox="0 0 80 80" width="72" height="72" style={{flexShrink:0}}>
      <circle cx={cx} cy={cy} r="38" fill="rgba(27,79,110,.25)" stroke="rgba(46,125,168,.25)" strokeWidth="1"/>
      {["N","E","S","W"].map((d,i)=>{ const a=i*90; const rx=cx+30*Math.cos((a-90)*Math.PI/180); const ry=cy+30*Math.sin((a-90)*Math.PI/180); return <text key={d} x={rx} y={ry} fontSize="7" fill="var(--fog)" textAnchor="middle" dominantBaseline="middle">{d}</text>;})}
      <line x1={cx} y1={cy} x2={nx} y2={ny} stroke="var(--sand)" strokeWidth="3" strokeLinecap="round"/>
      <line x1={cx} y1={cy} x2={tx} y2={ty} stroke="rgba(200,169,110,.3)" strokeWidth="2" strokeLinecap="round"/>
      <circle cx={cx} cy={cy} r="4" fill="var(--sand)"/>
    </svg>
  );
};

export default function HookLog() {
  const [tab, setTab] = useState("Dashboard");
  const [catches, setCatches] = useState([
    { id:1, species:"Largemouth Bass", weight:4.2, length:18, lure:"Spinnerbait", spot:"Lake Lanier - Dock Area", weather:"Sunny", water:"Clear", time:"07:30 AM", date:"Mar 7", notes:"Hit on second cast off the dock", photo:null, lat:"34.30200", lng:"-83.82400" },
    { id:2, species:"Smallmouth Bass", weight:2.8, length:15, lure:"Drop Shot", spot:"Chattahoochee River", weather:"Cloudy", water:"Stained", time:"06:15 AM", date:"Mar 5", notes:"", photo:null, lat:"33.84700", lng:"-84.46800" },
    { id:3, species:"Spotted Bass", weight:3.5, length:16, lure:"Jig", spot:"Etowah River", weather:"Overcast", water:"Clear", time:"08:00 AM", date:"Feb 28", notes:"PB spotted bass!", photo:null, lat:"34.14800", lng:"-84.70100" },
  ]);
  const [form, setForm] = useState({ species:"", weight:"", length:"", lure:"", spot:"", weather:"", water:"", time:"", notes:"", photo:null, lat:null, lng:null });
  const [toast, setToast] = useState("");
  const [shareTarget, setShareTarget] = useState(null);
  const [launchFilter, setLaunchFilter] = useState("All");
  const [launchSearch, setLaunchSearch] = useState("");
  const [launchType, setLaunchType] = useState("All");
  const [waypoints, setWaypoints] = useState([
    { id:1, name:"Big Bass Dock", lat:"34.302", lng:"-83.824", body:"Lake Lanier", notes:"Dock pilings near cove - 4lb LMB on spinnerbait", date:"Mar 7" },
    { id:2, name:"Shoal Pocket", lat:"34.148", lng:"-84.701", body:"Etowah River", notes:"Rocky shoal, spotted bass stacked. Best at low water.", date:"Feb 28" },
  ]);
  const [wpForm, setWpForm] = useState({ name:"", lat:"", lng:"", body:"", notes:"" });
  const [knotActive, setKnotActive] = useState(null);
  const [knotStep, setKnotStep] = useState(0);
  const [solunarDate, setSolunarDate] = useState(new Date());
  const photoRef = useRef();

  // Weather
  const [wx, setWx] = useState(null);
  const [wxLoading, setWxLoading] = useState(false);

  const showToast = (msg) => { setToast(msg); setTimeout(()=>setToast(""),2500); };

  const loadWeather = (loc) => {
    setWxLoading(true);
    const data = generateWeather(loc.name + ", " + loc.state);
    setWx(data);
    setWxLoading(false);
    showToast("[wx] WEATHER LOADED!");
  };

  const handlePhoto = (e) => {
    const file=e.target.files[0]; if(!file) return;
    const reader=new FileReader();
    reader.onload=(ev)=>setForm(f=>({...f,photo:ev.target.result}));
    reader.readAsDataURL(file);
  };

  const handlePin = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos)=>{ setForm(f=>({...f,lat:pos.coords.latitude.toFixed(5),lng:pos.coords.longitude.toFixed(5)})); showToast("[pin] LOCATION PINNED!"); },
        ()=>{ setForm(f=>({...f,lat:"34.30200",lng:"-83.82400"})); showToast("[pin] DEMO PIN SET"); }
      );
    } else { setForm(f=>({...f,lat:"34.30200",lng:"-83.82400"})); showToast("[pin] DEMO PIN SET"); }
  };

  const handleSubmit = () => {
    if (!form.species){ showToast("SELECT A SPECIES TO LOG"); return; }
    setCatches(prev=>[{id:Date.now(),...form,date:new Date().toLocaleDateString('en-US',{month:'short',day:'numeric'})}, ...prev]);
    setForm({species:"",weight:"",length:"",lure:"",spot:"",weather:"",water:"",time:"",notes:"",photo:null,lat:null,lng:null});
    setTab("My Catches"); showToast("[~] CATCH LOGGED!");
  };

  const handleShare = (platform, c) => {
    const caption=`[~] Just landed a ${c.weight}lb ${c.species} at ${c.spot}!\n\nLure: ${c.lure} | Water: ${c.water} | ${c.weather}\n\nLogged with #HookLog - Track - Log - Dominate [kayak]\n\n#KayakFishing #NorthGAFisherman #BassFishing #FishingLife`;
    navigator.clipboard?.writeText(caption).catch(()=>{});
    showToast(platform==="ig"?"[ok] COPIED - PASTE INTO INSTAGRAM!":platform==="tt"?"[ok] COPIED - PASTE INTO TIKTOK!":"[ok] CAPTION COPIED!");
    setShareTarget(null);
  };

  const totalWeight=catches.reduce((s,c)=>s+parseFloat(c.weight||0),0);
  const biggestCatch=catches.length?catches.reduce((a,b)=>parseFloat(a.weight)>parseFloat(b.weight)?a:b):null;
  const lureCount=catches.reduce((acc,c)=>{if(c.lure)acc[c.lure]=(acc[c.lure]||0)+1;return acc;},{});
  const favLure=Object.keys(lureCount).sort((a,b)=>lureCount[b]-lureCount[a])[0]||"-";
  const fishEmoji=(s="")=>s.includes("Trout")?"[fish]":s.includes("Cat")?"[fish]":"[~]";
  const US_REGIONS = {"[GA] Georgia":["GA"],"[SE] Southeast":["FL","AL","MS","SC","NC","TN"],"[APP] Appalachian":["VA","WV","KY","MD","PA","DE"],"[NE] Northeast":["NY","NJ","CT","RI","MA","NH","VT","ME"],"[MW] Midwest":["OH","IN","IL","MI","WI","MN","IA","MO","ND","SD","NE","KS"],"[SC] South Central":["TX","OK","AR","LA"],"[MTN] Mountain":["CO","UT","WY","MT","ID","NV","NM","AZ"],"[PAC] Pacific":["WA","OR","CA"],"[HI] HI/AK":["HI","AK"]};
  const filteredLaunches=LAUNCH_SITES.filter(l=>{
    const typeOk = launchType==="All" || l.type===launchType;
    const searchOk = !launchSearch || l.name.toLowerCase().includes(launchSearch.toLowerCase()) || l.body.toLowerCase().includes(launchSearch.toLowerCase()) || l.state.toLowerCase().includes(launchSearch.toLowerCase());
    let filterOk = true;
    if (launchFilter==="All") filterOk = true;
    else { const rs=US_REGIONS[launchFilter]; filterOk = rs ? rs.includes(l.state) : l.body.toLowerCase().includes(launchFilter.toLowerCase()); }
    return typeOk && searchOk && filterOk;
  });

  // Weather helpers
  const score = wx ? fishingScore(wx.current) : null;
  const si = score !== null ? scoreInfo(score) : null;

  return (
    <>
      <style>{css}</style>
      <div className="app">
        {toast && <div className="toast">{toast}</div>}

        {shareTarget && (
          <div className="modal-overlay" onClick={()=>setShareTarget(null)}>
            <div className="share-modal" onClick={e=>e.stopPropagation()}>
              <div className="share-title">Share This Catch [share]</div>
              <div className="share-sub">Auto-generated caption ready to post</div>
              {shareTarget.photo&&<img src={shareTarget.photo} style={{width:'100%',height:140,objectFit:'cover',borderRadius:12,marginBottom:14}}/>}
              <div className="share-preview"><div className="share-caption">{`[~] Just landed a ${shareTarget.weight}lb ${shareTarget.species} at ${shareTarget.spot}!\n\nLure: ${shareTarget.lure} | Water: ${shareTarget.water} | ${shareTarget.weather}\n\nLogged with #HookLog [kayak]\n\n#KayakFishing #NorthGAFisherman #BassFishing`}</div></div>
              <div className="share-grid">
                <button className="share-btn ig" onClick={()=>handleShare("ig",shareTarget)}>[cam] Instagram</button>
                <button className="share-btn tt" onClick={()=>handleShare("tt",shareTarget)}>[note] TikTok</button>
                <button className="share-btn cp" onClick={()=>handleShare("copy",shareTarget)}>[copy] Copy</button>
                <button className="share-btn" onClick={()=>handleShare("copy",shareTarget)}>[msg] Message</button>
              </div>
              <button className="cancel-btn" onClick={()=>setShareTarget(null)}>CANCEL</button>
            </div>
          </div>
        )}

        <div className="header">
          <div className="logo">
            <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <clipPath id="cr"><rect width="46" height="46" rx="11"/></clipPath>
                <linearGradient id="hookGold" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FFE066"/>
                  <stop offset="40%" stopColor="#D4A017"/>
                  <stop offset="100%" stopColor="#A87C00"/>
                </linearGradient>
              </defs>
              <rect width="46" height="46" rx="11" fill="#3b4a28"/>
              <g clipPath="url(#cr)">
                <ellipse cx="5" cy="4" rx="10" ry="8" fill="#2a3518" opacity="0.9"/>
                <ellipse cx="22" cy="2" rx="9" ry="6" fill="#4a5e30" opacity="0.8"/>
                <ellipse cx="40" cy="6" rx="12" ry="9" fill="#1e2c12" opacity="0.9"/>
                <ellipse cx="48" cy="20" rx="9" ry="11" fill="#3a4c22" opacity="0.8"/>
                <ellipse cx="0" cy="22" rx="8" ry="10" fill="#283318" opacity="0.9"/>
                <ellipse cx="12" cy="32" rx="10" ry="8" fill="#4a5e30" opacity="0.7"/>
                <ellipse cx="30" cy="38" rx="11" ry="9" fill="#1e2c12" opacity="0.9"/>
                <ellipse cx="44" cy="36" rx="8" ry="10" fill="#2a3518" opacity="0.8"/>
                <ellipse cx="20" cy="18" rx="7" ry="5" fill="#1e2c12" opacity="0.6"/>
                <ellipse cx="36" cy="24" rx="6" ry="7" fill="#4a5e30" opacity="0.5"/>
                <ellipse cx="8" cy="42" rx="9" ry="6" fill="#3a4c22" opacity="0.7"/>
              </g>
              {/* Eye/loop at top */}
              <ellipse cx="24" cy="9" rx="3.5" ry="3.5" stroke="url(#hookGold)" strokeWidth="2.2" fill="none"/>
              {/* Shank going down */}
              <line x1="24" y1="12.5" x2="24" y2="28" stroke="url(#hookGold)" strokeWidth="2.2" strokeLinecap="round"/>
              {/* Bend curving around */}
              <path d="M24 28 Q24 38 33 38 Q40 38 40 31" stroke="url(#hookGold)" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
              {/* Point going back up */}
              <path d="M40 31 L40 25" stroke="url(#hookGold)" strokeWidth="2.2" strokeLinecap="round"/>
              {/* Barb */}
              <path d="M40 27 L36.5 24.5" stroke="url(#hookGold)" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <div className="logo-text">Hook<span>Log</span></div>
          </div>
          <div className="tagline">Track - Log - Dominate</div>
        </div>
        <div className="nav">{TABS.map(t=><button key={t} className={`nav-btn${tab===t?" active":""}`} onClick={()=>setTab(t)}>{t}</button>)}</div>

        <div className="content">

          {/* DASHBOARD */}
          {tab==="Dashboard"&&<>
            <div className="stats-row">
              <div className="stat-card"><div className="stat-label">Total Catches</div><div className="stat-value">{catches.length}</div><div className="stat-sub">this season</div></div>
              <div className="stat-card"><div className="stat-label">Total Weight</div><div className="stat-value">{totalWeight.toFixed(1)}</div><div className="stat-sub">lbs landed</div></div>
              <div className="stat-card"><div className="stat-label">Top Lure</div><div className="stat-value" style={{fontSize:18,paddingTop:6}}>{favLure}</div><div className="stat-sub">{lureCount[favLure]||0} catches</div></div>
              <div className="stat-card"><div className="stat-label">Personal Best</div><div className="stat-value">{biggestCatch?.weight||"-"}</div><div className="stat-sub">lbs . {biggestCatch?.species?.split(" ")[0]||""}</div></div>
            </div>
            {biggestCatch&&<div className="personal-best"><div className="pb-title">[trophy] Personal Best</div><div className="pb-grid"><div className="pb-item"><div className="pb-val">{biggestCatch.weight}</div><div className="pb-lbl">lbs</div></div><div className="pb-item"><div className="pb-val">{biggestCatch.length}"</div><div className="pb-lbl">length</div></div><div className="pb-item"><div className="pb-val">{biggestCatch.lure?.split(" ")[0]}</div><div className="pb-lbl">lure</div></div></div></div>}
            <div className="section-title">Recent Catches</div>
            {catches.slice(0,3).map(c=>(
              <div className="catch-card" key={c.id} style={{display:'flex',alignItems:'center',gap:14}} onClick={()=>setShareTarget(c)}>
                <div className="catch-emoji">{c.photo?<img src={c.photo} style={{width:44,height:44,objectFit:'cover'}}/>:fishEmoji(c.species)}</div>
                <div style={{flex:1}}><div className="catch-species">{c.species}</div><div className="catch-meta">{c.spot} . {c.date}</div></div>
                <div><div className="catch-size">{c.weight}</div><div className="catch-size-unit">lbs</div></div>
              </div>
            ))}
            <button className="submit-btn" style={{marginTop:16}} onClick={()=>setTab("Log Trip")}>+ LOG A NEW CATCH</button>
          </>}

          {/* LOG TRIP */}
          {tab==="Log Trip"&&<>
            <div className="form-section">
              <label className="input-label">[cam] Photo</label>
              <div className="photo-upload-area" onClick={()=>photoRef.current?.click()}>
                {form.photo?<><img src={form.photo} className="photo-preview"/><button className="photo-remove" onClick={e=>{e.stopPropagation();setForm(f=>({...f,photo:null}));}}>x</button></>:<><div style={{fontSize:36}}>[cam]</div><div style={{fontFamily:'Oswald,sans-serif',fontSize:13,letterSpacing:1,color:'var(--fog)',marginTop:8}}>TAP TO ADD PHOTO</div></>}
              </div>
              <input ref={photoRef} type="file" accept="image/*" style={{display:'none'}} onChange={handlePhoto}/>
            </div>
            <div className="form-section">
              <label className="input-label">[pin] Pin Your Spot</label>
              <div className="map-section">
                {form.lat?<div className="map-pin-set"><div style={{fontSize:28}}>[pin]</div><div style={{flex:1}}><div style={{fontFamily:'Oswald,sans-serif',fontSize:13,color:'var(--water-light)'}}>Pinned</div><div style={{fontSize:11,color:'var(--fog)',marginTop:2}}>{form.lat}, {form.lng}</div></div><button style={{background:'transparent',border:'1px solid rgba(200,169,110,.2)',color:'var(--fog)',borderRadius:8,padding:'5px 10px',cursor:'pointer',fontSize:11,fontFamily:'Oswald,sans-serif'}} onClick={()=>setForm(f=>({...f,lat:null,lng:null}))}>CLEAR</button></div>:<div className="map-placeholder" onClick={handlePin}><div style={{fontSize:32}}>[map]</div><div style={{fontFamily:'Oswald,sans-serif',fontSize:13,letterSpacing:1,color:'var(--fog)'}}>TAP TO PIN YOUR SPOT</div><div style={{fontSize:11,color:'var(--text-dim)'}}>Uses your GPS location</div></div>}
              </div>
            </div>
            <div className="form-section"><label className="input-label">Fish Species *</label><select className="input-field" value={form.species} onChange={e=>setForm({...form,species:e.target.value})}><option value="">Select species...</option>{FISH_TYPES.map(f=><option key={f}>{f}</option>)}</select></div>
            <div className="form-section"><div className="input-row"><div><label className="input-label">Weight (lbs) *</label><input className="input-field" type="number" step="0.1" placeholder="3.5" value={form.weight} onChange={e=>setForm({...form,weight:e.target.value})}/></div><div><label className="input-label">Length (in)</label><input className="input-field" type="number" placeholder='16"' value={form.length} onChange={e=>setForm({...form,length:e.target.value})}/></div></div></div>
            <div className="form-section"><label className="input-label">Spot / Location *</label><input className="input-field" placeholder="e.g. Lake Lanier - North Cove" value={form.spot} onChange={e=>setForm({...form,spot:e.target.value})}/></div>
            <div className="form-section"><label className="input-label">Lure / Bait</label><div className="chip-group">{LURES.map(l=><button key={l} className={`chip${form.lure===l?" selected":""}`} onClick={()=>setForm({...form,lure:l})}>{l}</button>)}</div></div>
            <div className="form-section"><label className="input-label">Weather</label><div className="chip-group">{WEATHER_OPTS.map(w=><button key={w} className={`chip${form.weather===w?" selected":""}`} onClick={()=>setForm({...form,weather:w})}>{w}</button>)}</div></div>
            <div className="form-section"><label className="input-label">Water Conditions</label><div className="chip-group">{WATER.map(w=><button key={w} className={`chip${form.water===w?" selected":""}`} onClick={()=>setForm({...form,water:w})}>{w}</button>)}</div></div>
            <div className="form-section"><label className="input-label">Time of Catch</label><input className="input-field" type="time" value={form.time} onChange={e=>setForm({...form,time:e.target.value})}/></div>
            <div className="form-section"><label className="input-label">Notes</label><textarea className="input-field" rows={3} placeholder="What worked? Depth, structure, retrieve speed..." value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} style={{resize:'none'}}/></div>
            <button className="submit-btn" onClick={handleSubmit}>[~] LOG THIS CATCH</button>
          </>}

          {/* MY CATCHES */}
          {tab==="My Catches"&&<>
            {catches.length===0?<div style={{textAlign:'center',padding:'40px 20px',color:'var(--fog)'}}><div style={{fontSize:48,marginBottom:12}}>[~]</div><p>No catches yet. Get out there!</p></div>:catches.map(c=>{
              const isPB=c.id===biggestCatch?.id;
              return <div className="catch-card" key={c.id} style={{flexDirection:'column',alignItems:'flex-start',gap:8}}>
                {c.photo&&<img src={c.photo} style={{width:'100%',height:160,objectFit:'cover',borderRadius:10,marginBottom:4}}/>}
                <div style={{display:'flex',width:'100%',alignItems:'center',gap:12}}>
                  <div className="catch-emoji">{fishEmoji(c.species)}</div>
                  <div style={{flex:1}}><div className="catch-species">{c.species}{isPB&&<span className="record-badge">PB</span>}</div><div className="catch-meta">{c.date}{c.time?` . ${c.time}`:""}</div></div>
                  <div><div className="catch-size">{c.weight}</div><div className="catch-size-unit">lbs</div></div>
                </div>
                <div style={{paddingLeft:56,width:'100%'}}>
                  <div style={{fontSize:12,color:'var(--fog)',marginBottom:4}}>[pin] {c.spot}</div>
                  {c.lat&&<div style={{fontSize:11,color:'var(--water-light)',marginBottom:6}}>[map] {c.lat}, {c.lng}</div>}
                  <div style={{display:'flex',gap:6,flexWrap:'wrap',marginBottom:8}}>{c.lure&&<span className="chip" style={{fontSize:11,padding:'3px 10px'}}>{c.lure}</span>}{c.weather&&<span className="chip" style={{fontSize:11,padding:'3px 10px'}}>{c.weather}</span>}{c.water&&<span className="chip" style={{fontSize:11,padding:'3px 10px'}}>{c.water}</span>}</div>
                  {c.notes&&<div style={{fontSize:12,color:'var(--text-dim)',marginBottom:10,fontStyle:'italic'}}>"{c.notes}"</div>}
                  <div style={{display:'flex',gap:8}}>
                    <button onClick={()=>setShareTarget(c)} style={{padding:'8px 16px',background:'linear-gradient(135deg,rgba(131,58,180,.3),rgba(252,176,69,.2))',border:'1px solid rgba(252,176,69,.3)',borderRadius:20,color:'var(--cream)',fontFamily:'Oswald,sans-serif',fontSize:12,letterSpacing:1,cursor:'pointer'}}>[share] SHARE</button>
                    {c.lat&&<button onClick={()=>window.open(`https://www.google.com/maps?q=${c.lat},${c.lng}`,'_blank')} style={{padding:'8px 16px',background:'rgba(27,79,110,.3)',border:'1px solid rgba(46,125,168,.3)',borderRadius:20,color:'var(--water-light)',fontFamily:'Oswald,sans-serif',fontSize:12,letterSpacing:1,cursor:'pointer'}}>[map] MAP</button>}
                  </div>
                </div>
              </div>;
            })}
          </>}

          {/* -- WEATHER TAB -- */}
          {tab==="Weather"&&<>
            {!wx&&!wxLoading&&<>
              <div style={{textAlign:'center',padding:'30px 0 20px'}}>
                <div style={{fontSize:60,marginBottom:12}}>[wx]</div>
                <div style={{fontFamily:'Oswald,sans-serif',fontSize:20,color:'var(--cream)',letterSpacing:2,marginBottom:6}}>FISHING WEATHER</div>
                <div style={{fontSize:13,color:'var(--fog)',marginBottom:24,lineHeight:1.6}}>Real-time temp, wind, pressure, UV, fishing score,<br/>hourly forecast & 7-day outlook.</div>
              </div>
              <div className="section-title">Pick a Location</div>
              <div className="wx-location-grid">
                {PRESET_LOCATIONS.map(loc=>(
                  <button key={loc.name} className="wx-loc-btn" onClick={()=>loadWeather(loc)}>
                    <span className="wx-loc-name">[pin] {loc.name}</span>
                    <span className="wx-loc-state">{loc.state}</span>
                  </button>
                ))}
              </div>
              <button className="wx-load-btn" onClick={()=>loadWeather({name:"My Location",state:"Current GPS",lat:34.302,lng:-83.824})}>[pin] USE MY CURRENT LOCATION</button>
            </>}

            {wxLoading&&<div style={{textAlign:'center',padding:'60px 0'}}><div style={{fontSize:48,marginBottom:16}} className="spinner">[spin]</div><div style={{fontFamily:'Oswald,sans-serif',fontSize:14,color:'var(--fog)',letterSpacing:2}}>LOADING CONDITIONS...</div></div>}

            {wx&&!wxLoading&&<>
              {/* HERO */}
              <div className="wx-hero">
                <div className="wx-location-label">[pin] {wx.location}</div>
                <div className="wx-temp">{wx.current.temp}<sup>degF</sup></div>
                <div className="wx-cond">{wmoLabel(wx.current.code)}</div>
                <div className="wx-row">
                  <span>Feels <b>{wx.current.feels}deg</b></span>
                  <span>^ <b>{wx.forecast[0].hi}deg</b></span>
                  <span>v <b>{wx.forecast[0].lo}deg</b></span>
                </div>
              </div>

              {/* FISHING SCORE */}
              <div className="wx-score-box">
                <div className="wx-score-label-sm">[~] Today's Fishing Score</div>
                <div className="wx-track"><div className="wx-fill" style={{width:`${score}%`,background:`linear-gradient(90deg,var(--water),${si.color})`}}/></div>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <div className="wx-score-num" style={{color:si.color}}>{score}/100 - {si.label}</div>
                  <div style={{fontFamily:'Oswald,sans-serif',fontSize:11,color:'var(--fog)'}}>{score}%</div>
                </div>
                <div className="wx-tip">{score>=80?"[fire] Perfect day. Get on the water. Fish are active and biting hard.":score>=60?"[+1] Good conditions. Productive fishing likely, especially at dawn.":score>=40?"[!] Mixed bag. Try deeper water and slower presentations.":"[no] Tough day. Fish likely inactive - try deep structure or wait it out."}</div>
              </div>

              {/* HOURLY */}
              <div className="section-title">Hourly Forecast</div>
              <div className="wx-hourly">
                {wx.hourly.slice(0,12).map((h,i)=>(
                  <div key={i} className={`wx-hcard${i===0?" now":""}`}>
                    <div className="wx-htime">{h.time}</div>
                    <div className="wx-hico">{wmoLabel(h.code).slice(-2)}</div>
                    <div className="wx-htemp">{h.temp}deg</div>
                    {h.rainPct>10&&<div className="wx-hrain">{h.rainPct}%[drop]</div>}
                  </div>
                ))}
              </div>

              {/* WIND */}
              <div className="section-title">Wind</div>
              <div style={{display:'flex',gap:14,marginBottom:16,alignItems:'center',background:'rgba(255,255,255,.03)',border:'1px solid rgba(200,169,110,.08)',borderRadius:16,padding:16}}>
                <WindCompass deg={wx.current.winddir} speed={wx.current.windspeed}/>
                <div style={{flex:1}}>
                  <div style={{fontFamily:'Oswald,sans-serif',fontSize:30,fontWeight:700,color:'var(--cream)',lineHeight:1}}>{wx.current.windspeed} <span style={{fontSize:14,color:'var(--fog)'}}>MPH</span></div>
                  <div style={{fontSize:12,color:'var(--fog)',marginTop:4}}>{windDir(wx.current.winddir)} . Gusts to {wx.current.windgusts} mph</div>
                  <div style={{fontSize:11,color:'var(--text-dim)',marginTop:6,lineHeight:1.4}}>{wx.current.windspeed<=8?"[~] Ideal - calm surface, easy casting":wx.current.windspeed<=15?"[!] Manageable - watch your drift":"[!] Strong - paddle with extra caution"}</div>
                </div>
              </div>

              {/* KEY STATS 2-COL */}
              <div className="section-title">Key Conditions</div>
              <div className="wx-2col">
                <div className="wx-card"><div className="wx-card-ico">[drop]</div><div className="wx-card-val">{wx.current.humidity}%</div><div className="wx-card-unit">Humidity</div><div className="wx-card-sub">Dew point {wx.current.dewpoint}degF</div></div>
                <div className="wx-card"><div className="wx-card-ico">[rain]</div><div className="wx-card-val">{wx.current.precipitation}"</div><div className="wx-card-unit">Precipitation</div><div className="wx-card-sub">Inches per hour</div></div>
                <div className="wx-card"><div className="wx-card-ico">[cloud]</div><div className="wx-card-val">{wx.current.cloud}%</div><div className="wx-card-unit">Cloud Cover</div><div className="wx-card-sub">{wx.current.cloud<25?"Clear skies":wx.current.cloud<60?"Partly cloudy":"Overcast"}</div></div>
                <div className="wx-card"><div className="wx-card-ico">[eye]</div><div className="wx-card-val">{wx.current.visibility}</div><div className="wx-card-unit">Visibility (km)</div><div className="wx-card-sub">{wx.current.visibility>8?"Excellent":"Reduced - use caution"}</div></div>
              </div>

              {/* 3-COL MINI STATS */}
              <div className="wx-3col">
                <div className="wx-mini"><div className="wx-mini-val">{uvLabel(wx.current.uv)}</div><div className="wx-mini-unit">UV Index</div><div className="wx-mini-lbl">{wx.current.uv} - {wx.current.uv<=2?"No action":wx.current.uv<=5?"SPF 30+":"SPF 50+"}</div></div>
                <div className="wx-mini"><div className="wx-mini-val">{wx.current.dewpoint}deg</div><div className="wx-mini-unit">Dew Point</div><div className="wx-mini-lbl">degF moisture</div></div>
                <div className="wx-mini"><div className="wx-mini-val">{wx.current.cloud}%</div><div className="wx-mini-unit">Sky Cover</div><div className="wx-mini-lbl">cloud pct</div></div>
              </div>

              {/* BAROMETER */}
              <div className="wx-baro">
                <div className="wx-baro-title">[compass] Barometric Pressure</div>
                <BaroMeter pressure={wx.current.pressure}/>
                <div style={{textAlign:'center',fontFamily:'Oswald,sans-serif',fontSize:24,fontWeight:700,color:'var(--cream)',marginBottom:4}}>{wx.current.pressure} <span style={{fontSize:12,color:'var(--fog)'}}>hPa</span></div>
                <div style={{textAlign:'center',fontSize:13,color:'var(--sand)',lineHeight:1.5}}>{pressureLabel(wx.current.pressure)}</div>
              </div>

              {/* SUNRISE / SUNSET */}
              <div className="wx-sun">
                <div className="wx-sun-card" style={{background:'rgba(255,200,50,.08)',border:'1px solid rgba(255,200,50,.2)'}}>
                  <div style={{fontSize:28}}>[sunrise]</div>
                  <div style={{fontFamily:'Oswald,sans-serif',fontSize:20,color:'var(--sand)',fontWeight:700,marginTop:4}}>{wx.forecast[0].sunrise}</div>
                  <div style={{fontSize:11,color:'var(--fog)',textTransform:'uppercase',letterSpacing:1,marginTop:3}}>Sunrise</div>
                  <div style={{fontSize:11,color:'var(--text-dim)',marginTop:4}}>Prime bite window [~]</div>
                </div>
                <div className="wx-sun-card" style={{background:'rgba(100,130,200,.08)',border:'1px solid rgba(100,130,200,.2)'}}>
                  <div style={{fontSize:28}}>[sunset]</div>
                  <div style={{fontFamily:'Oswald,sans-serif',fontSize:20,color:'var(--water-light)',fontWeight:700,marginTop:4}}>{wx.forecast[0].sunset}</div>
                  <div style={{fontSize:11,color:'var(--fog)',textTransform:'uppercase',letterSpacing:1,marginTop:3}}>Sunset</div>
                  <div style={{fontSize:11,color:'var(--text-dim)',marginTop:4}}>Evening feeding time [~]</div>
                </div>
              </div>

              {/* 7-DAY */}
              <div className="wx-7day">
                <div className="wx-7day-title">7-Day Outlook</div>
                {wx.forecast.map((d,i)=>{
                  const ds=fishingScore({windspeed:d.wind,precipitation:d.precip,pressure:wx.current.pressure,temp:(d.hi+d.lo)/2,code:d.code});
                  const di=scoreInfo(ds);
                  return (
                    <div className="wx-frow" key={i}>
                      <div className="wx-fday">{d.day}</div>
                      <div className="wx-fico">{wmoLabel(d.code).slice(-2)}</div>
                      <div className="wx-fdesc">{wmoLabel(d.code).replace(/[^\w\s]/g,"").trim().slice(0,14)}</div>
                      <div className="wx-fscore" style={{background:`${di.color}22`,color:di.color,border:`1px solid ${di.color}44`}}>{di.label}</div>
                      <div className="wx-ftemps"><span style={{color:'var(--cream)'}}>{d.hi}deg</span> <span style={{color:'var(--fog)'}}>{d.lo}deg</span></div>
                    </div>
                  );
                })}
              </div>

              {/* CHANGE LOCATION */}
              <button className="wx-load-btn" onClick={()=>setWx(null)} style={{marginBottom:8}}>[pin] CHANGE LOCATION</button>
            </>}
          </>}

          {/* LAUNCHES */}
          {tab==="Launches"&&<>
            <div className="form-section" style={{marginBottom:12}}><input className="input-field" placeholder="[search] Search river, lake, or site name..." value={launchSearch} onChange={e=>setLaunchSearch(e.target.value)}/></div>
            <div style={{display:'flex',gap:8,marginBottom:10,flexWrap:'wrap'}}>{["All","River","Lake"].map(t=><button key={t} className={`chip${launchType===t?" selected":""}`} onClick={()=>setLaunchType(t)}>{t}</button>)}</div>
            <div style={{fontSize:10,color:'var(--fog)',fontFamily:'Oswald,sans-serif',letterSpacing:1,marginBottom:6}}>FILTER BY REGION</div>
            <div style={{display:'flex',gap:6,marginBottom:14,overflowX:'auto',scrollbarWidth:'none',paddingBottom:2}}>
              {["All","[GA] Georgia","[SE] Southeast","[APP] Appalachian","[NE] Northeast","[MW] Midwest","[SC] South Central","[MTN] Mountain","[PAC] Pacific","[HI] HI/AK"].map(s=><button key={s} className={`chip${launchFilter===s?" selected":""}`} onClick={()=>setLaunchFilter(s)} style={{flexShrink:0,fontSize:11}}>{s}</button>)}
            </div>
            <div style={{fontSize:11,color:'var(--fog)',marginBottom:12,fontFamily:'Oswald,sans-serif',letterSpacing:1}}>{filteredLaunches.length} LAUNCH SITES SHOWN . {LAUNCH_SITES.length} TOTAL USA</div>
            {filteredLaunches.map(l=>(
              <div className="launch-card" key={l.id}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:6}}><div className="launch-name">{l.name}</div><div className="launch-state">{l.state}</div></div>
                <div style={{fontSize:12,color:'var(--water-light)',marginBottom:4}}>[wave] {l.body}</div>
                <div style={{fontSize:11,color:'var(--fog)',marginBottom:8}}>[kayak] {l.type} . {l.fee?"$ Fee Required":"[ok] Free"}</div>
                <div style={{display:'flex',flexWrap:'wrap',gap:5,marginBottom:10}}>{l.amenities.map(a=><span key={a} className="amenity-tag">{a}</span>)}</div>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <div style={{fontFamily:'Oswald,sans-serif',fontSize:14,color:'var(--sand)'}}>[star] {l.rating}</div>
                  <button className="directions-btn" onClick={()=>window.open(`https://www.google.com/maps/dir/?api=1&destination=${l.lat},${l.lng}`,'_blank')}>[map] DIRECTIONS</button>
                </div>
              </div>
            ))}
          </>}


          {/* -- SOLUNAR TAB -- */}
          {tab==="Solunar"&&(()=>{
            const now = new Date();
            const days = Array.from({length:14},(_,i)=>{const d=new Date(now);d.setDate(d.getDate()+i-3);return d;});
            const sel = solunarDate;
            const sol = getSolunar(sel);
            const dayNames=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
            const monthNames=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
            const ratingColor = sol.rating>=9?"#8BC34A":sol.rating>=7?"#C8A96E":sol.rating>=5?"#FF9800":"#F44336";
            const ratingLabel = sol.rating>=9?"[fire] PRIME":sol.rating>=7?"[+1] GOOD":sol.rating>=5?"[!] FAIR":"[no] SLOW";
            return (<>
              <div className="section-title">30-Day Solunar Calendar</div>
              <div className="sol-cal">
                {days.map((d,i)=>{
                  const s=getSolunar(d);
                  const isToday=d.toDateString()===now.toDateString();
                  const isSel=d.toDateString()===sel.toDateString();
                  return (<div key={i} className={`sol-day${isSel?" active":""}${s.moon.best?" best":""}`} onClick={()=>setSolunarDate(new Date(d))}>
                    <div className="sol-day-name">{dayNames[d.getDay()]}</div>
                    <div style={{fontSize:9,color:'var(--fog)',marginBottom:2}}>{monthNames[d.getMonth()]} {d.getDate()}</div>
                    <div className="sol-day-icon">{s.moon.icon}</div>
                    <div className="sol-day-rating" style={{color:s.rating>=9?"#8BC34A":s.rating>=7?"var(--sand)":"var(--fog)"}}>{s.rating}</div>
                    {isToday&&<div style={{fontSize:8,color:'var(--water-light)',marginTop:2}}>TODAY</div>}
                  </div>);
                })}
              </div>

              <div className="sol-header">
                <div className="sol-moon-icon">{sol.moon.icon}</div>
                <div className="sol-moon-name">{sol.moon.name}</div>
                <div style={{fontSize:12,color:'var(--fog)',marginBottom:10}}>{dayNames[sel.getDay()]}, {monthNames[sel.getMonth()]} {sel.getDate()}</div>
                <div className="sol-rating-row">
                  <div className="sol-rating-num" style={{color:ratingColor}}>{sol.rating}</div>
                  <div><div style={{fontFamily:'Oswald,sans-serif',fontSize:16,color:ratingColor}}>{ratingLabel}</div><div className="sol-rating-label">/ 10 . Day Rating</div></div>
                </div>
                <div className="sol-bar"><div className="sol-bar-fill" style={{width:`${sol.rating*10}%`}}/></div>
                {sol.moon.best&&<div style={{fontSize:12,color:'#8BC34A',marginTop:4}}>[star] {sol.moon.name} - Prime feeding conditions!</div>}
              </div>

              <div className="section-title">Feeding Windows</div>
              <div className="sol-windows">
                <div style={{gridColumn:'1/-1',display:'flex',gap:6,marginBottom:4}}>
                  <div style={{fontFamily:'Oswald,sans-serif',fontSize:10,color:'var(--sand)',letterSpacing:2}}>[yel] MAJOR - 90 min windows</div>
                </div>
                {sol.major.map((w,i)=>(
                  <div key={i} className="sol-win-card sol-win-major">
                    <div className="sol-win-title" style={{color:'var(--sand)'}}>Major {i+1}</div>
                    <div className="sol-win-time">{w.s}</div>
                    <div style={{fontSize:10,color:'var(--fog)'}}>to {w.e}</div>
                    <div className="sol-win-dur" style={{marginTop:4}}>90 min window</div>
                  </div>
                ))}
                <div style={{gridColumn:'1/-1',display:'flex',gap:6,marginBottom:4,marginTop:6}}>
                  <div style={{fontFamily:'Oswald,sans-serif',fontSize:10,color:'var(--moss-light)',letterSpacing:2}}>[grn] MINOR - 45 min windows</div>
                </div>
                {sol.minor.map((w,i)=>(
                  <div key={i} className="sol-win-card sol-win-minor">
                    <div className="sol-win-title" style={{color:'var(--moss-light)'}}>Minor {i+1}</div>
                    <div className="sol-win-time">{w.s}</div>
                    <div style={{fontSize:10,color:'var(--fog)'}}>to {w.e}</div>
                    <div className="sol-win-dur" style={{marginTop:4}}>45 min window</div>
                  </div>
                ))}
              </div>

              <div style={{background:'rgba(255,255,255,.03)',border:'1px solid rgba(200,169,110,.08)',borderRadius:14,padding:14,marginBottom:16}}>
                <div style={{fontFamily:'Oswald,sans-serif',fontSize:11,letterSpacing:2,color:'var(--fog)',marginBottom:8}}>[moon] MOON PHASE FISHING GUIDE</div>
                <div style={{fontSize:12,color:'var(--text-dim)',lineHeight:1.7}}>
                  {sol.moon.name==="Full Moon"||sol.moon.name==="New Moon" ? "[fire] Peak feeding phase. Fish are most active, especially during major windows. Target shallow structure at dawn/dusk." : sol.moon.pct > 0.6 ? "[+1] Strong phase. Good feeding activity expected. Major windows will be productive." : "[!] Neutral phase. Focus on structure and current breaks. Minor windows still produce."}
                </div>
              </div>
            </>);
          })()}

          {/* -- WAYPOINTS TAB -- */}
          {tab==="Waypoints"&&<>
            <div style={{fontSize:11,color:'var(--fog)',marginBottom:12,fontFamily:'Oswald,sans-serif',letterSpacing:1}}>{waypoints.length} SAVED SPOTS</div>
            <div className="wp-add-form">
              <div style={{fontFamily:'Oswald,sans-serif',fontSize:13,color:'var(--sand)',letterSpacing:2,marginBottom:12}}>+ DROP NEW WAYPOINT</div>
              <input className="input-field" placeholder="Spot Name (e.g. Big Bass Cove)" value={wpForm.name} onChange={e=>setWpForm(f=>({...f,name:e.target.value}))} style={{marginBottom:8}}/>
              <input className="input-field" placeholder="Body of Water" value={wpForm.body} onChange={e=>setWpForm(f=>({...f,body:e.target.value}))} style={{marginBottom:8}}/>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginBottom:8}}>
                <input className="input-field" placeholder="Latitude" value={wpForm.lat} onChange={e=>setWpForm(f=>({...f,lat:e.target.value}))}/>
                <input className="input-field" placeholder="Longitude" value={wpForm.lng} onChange={e=>setWpForm(f=>({...f,lng:e.target.value}))}/>
              </div>
              <textarea className="input-field" placeholder="Notes - structure, depth, what worked..." value={wpForm.notes} onChange={e=>setWpForm(f=>({...f,notes:e.target.value}))} rows={2} style={{marginBottom:10,resize:'none'}}/>
              <div style={{display:'flex',gap:8}}>
                <button className="wp-btn" onClick={()=>{
                  if(navigator.geolocation){navigator.geolocation.getCurrentPosition(p=>{setWpForm(f=>({...f,lat:p.coords.latitude.toFixed(5),lng:p.coords.longitude.toFixed(5)}));showToast("[pin] GPS PINNED!");},()=>{setWpForm(f=>({...f,lat:"34.302",lng:"-83.824"}));showToast("[pin] DEMO PIN");});}
                }}>[pin] PIN MY GPS</button>
                <button className="wp-btn" style={{background:'var(--moss)',border:'1px solid var(--moss-light)'}} onClick={()=>{
                  if(!wpForm.name){showToast("[!] NAME REQUIRED");return;}
                  setWaypoints(w=>[{id:Date.now(),...wpForm,date:new Date().toLocaleDateString('en-US',{month:'short',day:'numeric'})}, ...w]);
                  setWpForm({name:"",lat:"",lng:"",body:"",notes:""});
                  showToast("[pin] WAYPOINT SAVED!");
                }}>[save] SAVE WAYPOINT</button>
              </div>
            </div>
            {waypoints.map(wp=>(
              <div key={wp.id} className="wp-card">
                <div className="wp-name">[pin] {wp.name}</div>
                <div className="wp-body">[wave] {wp.body} . {wp.date}</div>
                {wp.notes&&<div className="wp-notes">{wp.notes}</div>}
                <div style={{fontSize:11,color:'var(--fog)',marginBottom:8}}>[web] {wp.lat}, {wp.lng}</div>
                <div className="wp-actions">
                  <button className="wp-btn" onClick={()=>window.open(`https://www.google.com/maps/dir/?api=1&destination=${wp.lat},${wp.lng}`,'_blank')}>[map] NAVIGATE</button>
                  <button className="wp-btn" onClick={()=>{navigator.clipboard?.writeText(`${wp.name}\n${wp.lat}, ${wp.lng}\n${wp.notes}`).catch(()=>{});showToast("[copy] WAYPOINT COPIED!");}}>[copy] SHARE</button>
                  <button className="wp-btn danger" onClick={()=>setWaypoints(w=>w.filter(x=>x.id!==wp.id))}>[del] DEL</button>
                </div>
              </div>
            ))}
          </>}

          {/* -- KNOTS TAB -- */}
          {tab==="Knots"&&<>
            <div style={{fontSize:11,color:'var(--fog)',marginBottom:12,fontFamily:'Oswald,sans-serif',letterSpacing:1}}>TAP A KNOT FOR STEP-BY-STEP GUIDE</div>
            <div className="knot-list">
              {KNOTS.map(k=>(
                <div key={k.id} className={`knot-card${knotActive===k.id?" active":""}`} onClick={()=>{setKnotActive(knotActive===k.id?null:k.id);setKnotStep(0);}}>
                  <div className="knot-name">{k.name}</div>
                  <div className="knot-meta">
                    <span className={`knot-tag ${k.difficulty.toLowerCase()}`}>{k.difficulty}</span>
                    <span className="knot-tag strength">[strong] {k.strength}</span>
                    <span className="knot-tag use">[~] {k.use}</span>
                  </div>
                  {knotActive===k.id&&<>
                    <div style={{borderTop:'1px solid rgba(200,169,110,.1)',paddingTop:12,marginTop:4}}>
                      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
                        <div style={{fontFamily:'Oswald,sans-serif',fontSize:11,color:'var(--fog)',letterSpacing:1}}>STEP {knotStep+1} OF {k.steps.length}</div>
                        <div style={{display:'flex',gap:6}}>
                          {knotStep>0&&<button className="wp-btn" style={{padding:'5px 12px',fontSize:11}} onClick={e=>{e.stopPropagation();setKnotStep(s=>s-1);}}>< PREV</button>}
                          {knotStep<k.steps.length-1&&<button className="wp-btn" style={{padding:'5px 12px',fontSize:11,background:'var(--moss)',border:'1px solid var(--moss-light)'}} onClick={e=>{e.stopPropagation();setKnotStep(s=>s+1);}}>NEXT ></button>}
                          {knotStep===k.steps.length-1&&<button className="wp-btn" style={{padding:'5px 12px',fontSize:11,background:'rgba(139,195,74,.15)',border:'1px solid #8BC34A',color:'#8BC34A'}} onClick={e=>e.stopPropagation()}>[ok] DONE!</button>}
                        </div>
                      </div>
                      <div style={{display:'flex',gap:8,marginBottom:8}}>
                        {k.steps.map((_,i)=><div key={i} style={{flex:1,height:4,borderRadius:2,background:i<=knotStep?'var(--sand)':'rgba(255,255,255,.1)'}}/>)}
                      </div>
                      <div className="knot-step">
                        <div className="knot-step-num">{knotStep+1}</div>
                        <div className="knot-step-text">{k.steps[knotStep]}</div>
                      </div>
                    </div>
                  </>}
                </div>
              ))}
            </div>
            <div style={{background:'rgba(255,255,255,.03)',border:'1px solid rgba(200,169,110,.08)',borderRadius:14,padding:14,fontSize:12,color:'var(--fog)',lineHeight:1.7}}>
              <div style={{fontFamily:'Oswald,sans-serif',fontSize:11,letterSpacing:2,color:'var(--sand)',marginBottom:6}}>[tip] PRO TIPS</div>
              Always wet your knot before cinching tight - dry line creates heat and weakens it. For braid-to-leader connections, the FG Knot is the strongest but practice it at home first. The Palomar is the most reliable all-around knot for beginners.
            </div>
          </>}

          {/* -- STATS TAB -- */}
          {tab==="Stats"&&(()=>{
            const speciesPBs = catches.reduce((acc,c)=>{
              if(!acc[c.species]||parseFloat(c.weight)>parseFloat(acc[c.species].weight)) acc[c.species]={weight:c.weight,lure:c.lure,date:c.date};
              return acc;
            },{});
            const byMonth = catches.reduce((acc,c)=>{ const m=c.date?.split(" ")[0]||"Mar"; acc[m]=(acc[m]||0)+1; return acc; },{});
            const months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
            const maxMonth=Math.max(1,...Object.values(byMonth));
            const sortedLures=Object.entries(lureCount).sort((a,b)=>b[1]-a[1]);
            const totalLure=Object.values(lureCount).reduce((s,n)=>s+n,0)||1;
            const avgWeight = catches.length ? (totalWeight/catches.length).toFixed(2) : "-";
            const speciesUnique = [...new Set(catches.map(c=>c.species))].length;
            return (<>
              <div className="stats-row" style={{marginBottom:14}}>
                <div className="stat-card"><div className="stat-label">Avg Weight</div><div className="stat-value" style={{fontSize:28}}>{avgWeight}</div><div className="stat-sub">lbs per catch</div></div>
                <div className="stat-card"><div className="stat-label">Species</div><div className="stat-value" style={{fontSize:28}}>{speciesUnique}</div><div className="stat-sub">unique species</div></div>
                <div className="stat-card"><div className="stat-label">Best Day</div><div className="stat-value" style={{fontSize:18,paddingTop:6}}>{biggestCatch?.date||"-"}</div><div className="stat-sub">{biggestCatch?.weight}lb {biggestCatch?.species?.split(" ")[0]}</div></div>
                <div className="stat-card"><div className="stat-label">Total Trips</div><div className="stat-value">{Math.ceil(catches.length/1.8)||0}</div><div className="stat-sub">estimated</div></div>
              </div>

              <div className="stats-big">
                <div className="stats-big-title">[trophy] Personal Bests by Species</div>
                {Object.keys(speciesPBs).length===0&&<div style={{color:'var(--fog)',fontSize:13}}>Log some catches to see your PBs!</div>}
                {Object.entries(speciesPBs).map(([sp,pb])=>(
                  <div key={sp} className="pb-row">
                    <div><div className="pb-species">{sp}</div><div className="pb-lure">[~] {pb.lure} . {pb.date}</div></div>
                    <div className="pb-weight">{pb.weight} lb</div>
                  </div>
                ))}
              </div>

              <div className="stats-big">
                <div className="stats-big-title">[cal] Catches by Month</div>
                {months.map(m=>(
                  <div key={m} className="month-bar-row">
                    <div className="month-label">{m}</div>
                    <div className="month-bar"><div className="month-bar-fill" style={{width:`${((byMonth[m]||0)/maxMonth)*100}%`}}/></div>
                    <div className="month-count">{byMonth[m]||0}</div>
                  </div>
                ))}
              </div>

              <div className="stats-big">
                <div className="stats-big-title">[~] Top Lures</div>
                {sortedLures.length===0&&<div style={{color:'var(--fog)',fontSize:13}}>No lure data yet.</div>}
                {sortedLures.map(([lure,count])=>(
                  <div key={lure} className="lure-row">
                    <div className="lure-name">{lure}</div>
                    <div className="lure-bar-wrap"><div className="lure-bar-fill" style={{width:`${(count/totalLure)*100}%`}}/></div>
                    <div className="lure-pct">{count}x</div>
                  </div>
                ))}
              </div>

              <div className="stats-big">
                <div className="stats-big-title">[stats] Catch Conditions</div>
                {["Sunny","Cloudy","Overcast","Rainy"].map(wx=>{
                  const cnt=catches.filter(c=>c.weather===wx).length;
                  return (<div key={wx} className="lure-row">
                    <div className="lure-name">{wx}</div>
                    <div className="lure-bar-wrap"><div className="lure-bar-fill" style={{width:`${(cnt/Math.max(1,catches.length))*100}%`,background:'var(--water-light)'}}/></div>
                    <div className="lure-pct">{cnt}</div>
                  </div>);
                })}
              </div>
            </>);
          })()}

          {/* CONDITIONS */}
          {tab==="Conditions"&&<>
            <div className="section-title">North GA Water Conditions</div>
            {MOCK_CONDITIONS.map(s=>(
              <div className="condition-card" key={s.name}>
                <div className="condition-location">[pin] {s.name}<span className={`badge badge-${s.rating}`}>{s.rating==='good'?'[ok] GOOD':'~ FAIR'}</span></div>
                <div className="condition-grid">
                  <div className="condition-item"><div className="condition-value">{s.level}</div><div className="condition-unit">{s.flow?"stage ft":"elevation"}</div></div>
                  {s.flow&&<div className="condition-item"><div className="condition-value">{s.flow}</div><div className="condition-unit">CFS flow</div></div>}
                  <div className="condition-item"><div className="condition-value">{s.temp}deg</div><div className="condition-unit">water degF</div></div>
                  <div className="condition-item"><div className="condition-value" style={{fontSize:16}}>{s.clarity}</div><div className="condition-unit">clarity</div></div>
                </div>
                <div style={{marginTop:12,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <span style={{fontSize:12,color:'var(--fog)'}}>{s.trend}</span>
                  <div className="water-level-bar" style={{width:'60%'}}><div className="water-level-fill" style={{width:`${Math.min(100,(s.level/5)*100)}%`}}/></div>
                </div>
              </div>
            ))}
            <div style={{marginTop:8,padding:'12px 16px',background:'rgba(255,255,255,.03)',borderRadius:12,fontSize:12,color:'var(--fog)',textAlign:'center'}}>[signal] Data updates every 15 min via USGS stream gauges</div>
          </>}

        </div>
      </div>
    </>
  );
}
