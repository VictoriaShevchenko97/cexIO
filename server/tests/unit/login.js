const request = require("request");
const mocha = require("mocha");
const expect = require("chai").expect;

const URL = "127.0.0.1";
const PORT = 3000;
const SUCCESS_STATUS_CODE = 200;

const FULL_URL = `http://${URL}:${PORT}`;

describe("POST-requests", () => {
    it("LOGIN", (done) => {
        request.post({
            url: FULL_URL + "/login",
            data: null
        }, function(err, httpResp, body) {
            if (err) {
                return done(err);
            }
            let resp;
            try {
                resp = JSON.parse(body);
            } catch (e) {
                return done(e);
            }
            expect(resp.status).to.equal("ok");
            expect(resp.data.sessionId).to.be;
            done();
          });
    });
});

