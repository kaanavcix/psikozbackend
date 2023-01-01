import cors from 'cors';





let whiteList = ["http://localhost.com"]

export let corsOptions = {

  origin: (req: any, callback: any) => {

    if (whiteList.indexOf("Origin",) !== -1) {

      callback(null, true);
    }
    else {
      callback(new Error("Geçersiz url bağlantısı"), false);

    }

  },
  methods: "GET,PUT,POST,DELETE"
}



