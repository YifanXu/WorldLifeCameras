var cameraInterval = 30000;

var cameras = [
  {
    type: "Youtube",
    category: "Beach",
    timezone:-6,
    Description: "Hollywood Beach, Florida, USA (美国 弗罗里达)",
    url: "https://www.youtube.com/embed/cmkAbDUEoyA",
    width: 560,
    height: 315,
    source: "https://www.livebeaches.com/city/hollywood-beach-fl/"
  },
  {
    type: "Youtube",
    category: "Beach",
    timezone: -6,
    Description: " Hollywood Beach Boardwalk Band Theatre, Florida, USA (美国 弗罗里达)",
    url: "https://www.youtube.com/embed/LTqT7IRLO0c",
    width: 560,
    height: 315,
    source: "https://www.livebeaches.com/webcams/hollywood-beach-band-theatre-live-cam/"
  },
  {
    type: "Youtube",
    category: "Beach",
    timezone: -6,
    Description: "Dania Beach, Florida, USA (美国 弗罗里达)",
    url: "https://www.youtube.com/embed/bEoNVd3spEM",
    width: 560,
    height: 315,
    source: "https://www.livebeaches.com/webcams/dania-beach-pier-live-cam/"
  },
  {
    type: "Youtube",
    category: "Sports",
    timezone: -6,
    Description: "Kiva Dunes Kiva Dunes, Alabama, USA (阿拉巴马州, 美国)",
    url: "https://www.youtube.com/embed/GvbhY-EaPJg",
    width: 560,
    height: 315,
    source: "https://www.livebeaches.com/webcams/kiva-dunes-live-cam/"
  },
  {
    type: "Youtube",
    category: "Street",
    timezone: 2,
    Description: "Masarykovo Square of Uherský Brod, Zlin Region, Czech Republic (兹林州, 捷克共和国)",
    url: "https://www.youtube.com/embed/Aq6snPCo0jM",
    width: 560,
    height: 315,
    source: "https://www.webcamtaxi.com/en/czech-republic/zlin-region/masarykovo-square-cam.html"
  },
  {
    type: "Youtube",
    category: "Beach",
    timezone: 2,
    Description: "Lido di Jesolo, Jesolo, Italy. (耶索洛, 意大利)",
    url: "https://www.youtube.com/embed/c0jYVsYTcfA",
    width: 560,
    height: 315,
    source: "https://www.webcamtaxi.com/en/italy/veneto/venice-lidojesolo-chioscoveliero-cam.html"
  },
  {
    type: "Youtube",
    category: "Landscape",
    timezone: 2,
    Description: "Pra' delle Torri Holiday Centre, Veneto, Italy (威尼托大区,意大利)",
    url: "https://www.youtube.com/embed/akdW-Hf_R2Q",
    width: 560,
    height: 315,
    source: "https://www.webcamtaxi.com/en/italy/veneto/venice-centro-vacanze-pradelletorri-cam.html"
  },
  {
    type: "Youtube",
    category: "Street",
    timezone: 3,
    Description: "Neo Karlovasi, Samos Island, Greece (萨摩斯岛, 希腊)",
    url: "https://www.youtube.com/embed/DY0Iyprkau4",
    width: 560,
    height: 315,
    source: "https://www.webcamtaxi.com/en/greece/north-aegean/north-aegean.html"
  },
  {
    type: "Youtube",
    category: "Street",
    timezone: 9,
    Description: "Kabukichō Ichiban-gai Street, Shinjuku City, Tokyo, Japan (东京新宿,日本)",
    url: "https://www.youtube.com/embed/DjdUEyjx8GM",
    width: 560,
    height: 315,
    source: "https://www.webcamtaxi.com/en/japan/tokyo/kabukicho-shinjuku-cam.html"
  },
  {
    type: "Youtube",
    category: "Landscape",
    timezone: 8,
    Description: "University of Washington, Seattle, Washington, USA (华盛顿州立大学，美国)",
    url: "https://www.youtube.com/embed/xF57xr65KQY",
    width: 560,
    height: 315,
    source: "https://www.livebeaches.com/webcams/university-of-washington-red-square-cam/"
  },
  {
    type: "Youtube",
    category: "Street",
    timezone: -4,
    Description: "Times Square, New York City, USA (纽约时代广场，美国)",
    url: "https://www.youtube.com/embed/1-iS7LArMPA",
    width: 560,
    height: 315,
    source: "https://www.youtube.com/watch?v=1-iS7LArMPA"
  }
];
