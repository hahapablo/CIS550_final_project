const { expect } = require("@jest/globals");
const supertest = require("supertest");
const { number } = require("yargs");
const results = require("./results.json")
const app = require('../server');

// **********************************
//         BASIC ROUTES TESTS
// **********************************


test("GET /song", async () => {
    await supertest(app).get("/song")
      .expect(200)
      .then((response) => {
        // Check length 
        expect(response.body.results.length).toEqual(131771)
      });
});

test("GET /search_by_content", async () => {
  await supertest(app).get("/search_by_content?SearchBy=genre&SearchContent=rock")
    .expect(200)
    .then((response) => {
      // Check text 
      expect(response.body.results[0]).toStrictEqual(results.rock)
    });
});

test("GET /search_by_content", async () => {
  await supertest(app).get("/search_by_content?SearchBy=song&SearchContent=a")
    .expect(200)
    .then((response) => {
      // Check text 
      expect(response.body.results.length).toBeGreaterThan(1)
    });
});

test("GET /search_by_content", async () => {
  await supertest(app).get("/search_by_content?SearchBy=all&SearchContent=a")
    .expect(200)
    .then((response) => {
      // Check text 
      expect(response.body.results.length).toBeGreaterThan(1)
    });
});

test("GET /search_by_content", async () => {
  await supertest(app).get("/search_by_content?SearchBy=lyrics&SearchContent=a")
    .expect(200)
    .then((response) => {
      // Check text 
      expect(response.body.results.length).toBeGreaterThan(1)
    });
});

test("GET /search_by_content", async () => {
  await supertest(app).get("/search_by_content?SearchBy=album&SearchContent=a")
    .expect(200)
    .then((response) => {
      // Check text 
      expect(response.body.results.length).toBeGreaterThan(1)
    });
});

test("GET /search_by_content", async () => {
  await supertest(app).get("/search_by_content?SearchBy=artist&SearchContent=James")
    .expect(200)
    .then((response) => {
      // Check text 
      expect(response.body.results.length).toBeGreaterThan(1)
    });
});

test("GET /search_by_content", async () => {
  await supertest(app).get("/search_by_content?SearchBy=&SearchContent=James")
    .expect(200)
    .then((response) => {
      // Check text 
      expect(response.body.results.length).toBeGreaterThan(1)
    });
});

test("GET /search_by_content_and_range", async () => {
  await supertest(app).get("/search_by_content_and_range?SearchBy=song&SearchContent=a&AccousticnessLow=0&AccousticnessHigh=0.2&DanceabilityLow=0&DanceabilityHigh=1&EnergyLow=0&EnergyHigh=1")
    .expect(200)
    .then((response) => {
      // Check text 
      expect(response.body.results.length).toBeGreaterThan(1)
    });
});

test("GET /search_by_content_and_range", async () => {
  await supertest(app).get("/search_by_content_and_range?SearchBy=all&SearchContent=a&AccousticnessLow=0&AccousticnessHigh=0.2&DanceabilityLow=0&DanceabilityHigh=1&EnergyLow=0&EnergyHigh=1")
    .expect(200)
    .then((response) => {
      // Check text 
      expect(response.body.results.length).toBeGreaterThan(1)
    });
});

test("GET /search_by_content_and_range", async () => {
  await supertest(app).get("/search_by_content_and_range?SearchBy=album&SearchContent=a&AccousticnessLow=0&AccousticnessHigh=0.2&DanceabilityLow=0&DanceabilityHigh=1&EnergyLow=0&EnergyHigh=1")
    .expect(200)
    .then((response) => {
      // Check text 
      expect(response.body.results.length).toBeGreaterThan(1)
    });
});

test("GET /search_by_content_and_range", async () => {
  await supertest(app).get("/search_by_content_and_range?SearchBy=artist&SearchContent=a&AccousticnessLow=0&AccousticnessHigh=0.2&DanceabilityLow=0&DanceabilityHigh=1&EnergyLow=0&EnergyHigh=1")
    .expect(200)
    .then((response) => {
      // Check text 
      expect(response.body.results.length).toBeGreaterThan(1)
    });
});

test("GET /search_by_content_and_range_and_rank", async () => {
  await supertest(app).get("/search_by_content_and_range_and_rank?SearchBy=artist&SearchContent=a&AccousticnessLow=0&AccousticnessHigh=0.2&DanceabilityLow=0&DanceabilityHigh=1&EnergyLow=0&EnergyHigh=1&Rank=energy")
    .expect(200)
    .then((response) => {
      // Check text 
      expect(response.body.results.length).toBeGreaterThan(1)
    });
});

test("GET /search_by_content_and_range_and_rank", async () => {
  await supertest(app).get("/search_by_content_and_range_and_rank?SearchBy=all&SearchContent=a&AccousticnessLow=0&AccousticnessHigh=0.2&DanceabilityLow=0&DanceabilityHigh=1&EnergyLow=0&EnergyHigh=1&Rank=energy")
    .expect(200)
    .then((response) => {
      // Check text 
      expect(response.body.results.length).toBeGreaterThan(1)
    });
});

test("GET /search_by_content_and_range_and_rank", async () => {
  await supertest(app).get("/search_by_content_and_range_and_rank?SearchBy=song&SearchContent=a&AccousticnessLow=0&AccousticnessHigh=0.2&DanceabilityLow=0&DanceabilityHigh=1&EnergyLow=0&EnergyHigh=1&Rank=energy")
    .expect(200)
    .then((response) => {
      // Check text 
      expect(response.body.results.length).toBeGreaterThan(1)
    });
});

test("GET /search_by_content_and_range_and_rank", async () => {
  await supertest(app).get("/search_by_content_and_range_and_rank?SearchBy=album&SearchContent=a&AccousticnessLow=0&AccousticnessHigh=0.2&DanceabilityLow=0&DanceabilityHigh=1&EnergyLow=0&EnergyHigh=1&Rank=energy")
    .expect(200)
    .then((response) => {
      // Check text 
      expect(response.body.results.length).toBeGreaterThan(1)
    });
});

test("GET /search_by_content_and_range_and_rank", async () => {
  await supertest(app).get("/search_by_content_and_range_and_rank?SearchBy=&SearchContent=a&AccousticnessLow=0&AccousticnessHigh=0.2&DanceabilityLow=0&DanceabilityHigh=1&EnergyLow=0&EnergyHigh=1&Rank=energy")
    .expect(200)
    .then((response) => {
      // Check text 
      expect(response.body.results.length).toBeGreaterThan(1)
    });
});

/*
test("GET /hello with name", async () => {
  
    await supertest(app).get("/hello?name=Steve")
      .expect(200)
      .then((response) => {
        // Check text 
        expect(response.text).toBe("Hello, Steve! Welcome to the FIFA server!")
      });
});


test("GET /jersey color without name", async () => {
  
    for (var i = 0; i < 5; i++) {
    await supertest(app).get("/jersey/color")
      .expect(200)
      .then((response) => {
        expect(response.body.message).toBe('Hello, player!')
        expect(response.body.jersey_color).not.toBe('white')
      });
    }
});

test("GET /jersey color with name", async () => {
  
    for (var i = 0; i < 5; i++) {
    await supertest(app).get("/jersey/color?name=Lauder")
      .expect(200)
      .then((response) => {
        expect(response.body.message).toBe('Hello, Lauder!')
        expect(response.body.jersey_color).not.toBe('white')
        expect(response.body.jersey_color == 'red' || response.body.jersey_color == 'blue').toBeTruthy()
      });
    }
});

test("GET /jersey number without name", async () => {
  for (var i = 0; i < 5; i++) {
    await supertest(app).get("/jersey/number")
      .expect(200)
      .then((response) => {
        expect(response.body.message).toBe('Hello, player!')
        expect(isNaN(response.body.jersey_number)).toBe(false)
        expect(response.body.jersey_number).toBeGreaterThanOrEqual(1)
        expect(response.body.jersey_number).toBeLessThanOrEqual(20)
        
      });
    }
});

test("GET /jersey number with name", async () => {
  for (var i = 0; i < 5; i++) {
    await supertest(app).get("/jersey/number?name=Lauder")
      .expect(200)
      .then((response) => {
        expect(response.body.message).toBe('Hello, Lauder!')
        expect(isNaN(response.body.jersey_number)).toBe(false)
        expect(response.body.jersey_number).toBeGreaterThanOrEqual(1)
        expect(response.body.jersey_number).toBeLessThanOrEqual(20)
      });
    }
});

test("GET /jersey other value with no name", async () => {
    await supertest(app).get("/jersey/non")
      .expect(200)
      .then((response) => {
        expect(response.body.message).toBe('Hello, player, we like your jersey!')
      });
});


// **********************************
//        GENERAL ROUTES TESTS
// **********************************

test("GET /players no pagination", async () => {
  await supertest(app).get("/players")
    .expect(200)
    .then((response) => {
      expect(response.body.results.length).toEqual(1263)
    });
});

test("GET /matches no pagination", async () => {
  await supertest(app).get("/matches/D1")
    .expect(200)
    .then((response) => {
      expect(response.body.results.length).toEqual(306)
    });
});

// **********************************
//        MATCH TESTS
// **********************************

test("GET /match basic", async () => {
  await supertest(app).get("/match?id=132")
    .expect(200)
    .then((response) => {
      expect(response.body.results.length).toEqual(1)
      expect(response.body.results).toStrictEqual(results.match1)

    });
});


// **********************************
//        PLAYER ROUTES TESTS
// **********************************

test("GET /player basic 1 - N", async () => {
  await supertest(app).get("/player?id=20801")
    .expect(200)
    .then((response) => {
      expect(response.body.results.length).toEqual(1)
      expect(response.body.results).toStrictEqual(results.player1N)

    });
});

test("GET /player basic 2 - GK", async () => {
  await supertest(app).get("/player?id=51539")
    .expect(200)
    .then((response) => {
      expect(response.body.results.length).toEqual(1)
      expect(response.body.results).toStrictEqual(results.player1GK)

    });
});


// **********************************
//        SEARCH ROUTES TESTS
// **********************************

test("GET /search/matches basic 1", async () => {
  await supertest(app).get("/search/matches?Home=Bay&Away=Hertha")
    .expect(200)
    .then((response) => {
      expect(response.body.results.length).toEqual(1)
      expect(response.body.results).toStrictEqual(results.match_search1)

    });
});

test("GET /search/players basic 1", async () => {
  await supertest(app).get("/search/players?Name=Pepe&Nationality=Spain&Club=Lazio")
    .expect(200)
    .then((response) => {
      expect(response.body.results.length).toEqual(1)
      expect(response.body.results).toStrictEqual(results.player_search1)

    });
});
*/