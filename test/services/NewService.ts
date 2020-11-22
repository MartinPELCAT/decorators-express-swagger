import { Service } from "typedi";

@Service()
export class NewService {
  test() {
    console.log("NewService test");
  }
}
