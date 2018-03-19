import { inject, TestBed } from "@angular/core/testing";

import { Http, HttpModule } from "@angular/http";
import { SixmkApiService } from "../sixmk-api.service";

describe("SixmkApiService", () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [
        SixmkApiService
      ]
    });
  });

  it("should be created", inject([SixmkApiService], (service: SixmkApiService) => {
    expect(service).toBeTruthy();
  }));

  describe("pocketInvitations", () => {

    it("should return an array of PocketInvitations", inject([SixmkApiService], (service: SixmkApiService) => {
      service.pocketInvitations().subscribe(invitations => {
        expect(invitations).toBeDefined();
      });
    }));

  });

});
