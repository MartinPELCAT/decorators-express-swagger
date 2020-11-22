import { Service } from "../../src";

@Service()
export class HelloService {
  test() {
    console.log("from hello service");
  }
}
