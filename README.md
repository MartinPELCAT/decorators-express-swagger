# Express decorators swagger doc

## The Server

Sever.ts

```typescript
const app = express();

const { router } = BuildAPI({
  controllers: [HelloController],
  auth: () => {
    return true;
  },
});

app.use(router);

app.listen(5000, () => {
  console.log("Server started on http://localhost:5000");
});
```

## Controller

```typescript
@Controller("/hello")
export class HelloController {
  constructor(
    private helloService: HelloService,
    private newService: NewService
  ) {}

  @Get("/")
  @Middlewares([testMiddlware])
  @Middlewares(helloMiddlware)
  @Authorized(["ADMIN", "USER"])
  hello(_: Request, res: Response): HelloResponse {
    //Your code
    this.helloService.test();
    this.newService.test();
    res.send("Hello Controoler");
    return { test: "test" };
  }

  @Post("/test")
  @Authorized()
  test(_: Request, res: Response): HelloResponse {
    //Your code
    res.send("Hello Controoler test");
    return { test: "test" };
  }
}
```

## Services

```typescript
@Service()
export class HelloService {
  test() {
    //Your Code
  }
}
```

## Middleware

```typescript
export const helloMiddlware: MiddlewareFunction = (_req, _res, next) => {
  //Your code
  next();
};

export const anotherMiddlware = (aParameter: string) => {
  return (_req, _res, next): MiddlewareFunction => {
    //Your code
    next();
  };
};
```
