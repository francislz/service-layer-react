# React/React Native Service Layer

The first thing we need is to implement the abstract class containing all the methods needed for the service layer. I'll get into the Observable further in this document, but for starters don't worry about it.

```ts
export default abstract class IService {
    abstract get<T>(arg?: number | string): Observable<T[]>;
    abstract post<T>(arg: T): Observable<T[]>;
    abstract patch<T>(arg: T): Observable<T[]>;
    abstract delete<T>(id: number): Observable<T[]>;
}
```

After the base class, we must create the service classes that will communicate with the Rest API or whatever source of data you're using in your App. This approach is great for the following reasons:

- Creates a contract using the interface, therefore we ensure that the services will have the same methods.

- Isolates the API layer from the component itself, so changes on the classes will no longer affect the components, as long as the return type doesn't change.

- Code maintenance would be easier.

```ts
export default class JokeService implements IService {

    get<Joke>(type?: string): Observable<Joke[]> {
        throw new Error('Method not implemented.')
    }

    post<Joke>(arg: Joke): Observable<Joke[]> {
        throw new Error('Method not implemented.');
    }

    patch<Joke>(arg: Joke): Observable<Joke[]> {
        throw new Error('Method not implemented.');
    }

    delete<Joke>(id: number): Observable<Joke[]> {
        throw new Error('Method not implemented.');
    }
}
```

Now, to effectively use these service classes in a component I suggest creating a Hook. You might ask me why to create a Hook since I could just call new CityService(), for instance. Well, you're not wrong, but I'll get to that in a second.

```ts
export default function useService<T>(type: {new():  T }): T{
    return new type();
}
```
Basically, my Hook just receives a type as argument and returns a new instance of this type. This could be done by just by creating an instance, as simples as that, but there's a trick. You see, pure JS classes cannot initiate anything related to React, therefore, I cannot call useContext to access a global state directly from the Service class and that's when my hook comes into place. For instance, let's suppose we have a global state or a context to store error messages including those from the service layer. To make this work I can have another base class responsible for error handling that receives the context so it can change the state, and when my useService hook is called it will pass the context as an argument in the constructor. Let's see that in practice. First let's create an ErroHandling class.

```ts
export interface MessageContextProps {
    setMessage?: React.Dispatch<React.SetStateAction<string>>;
    message: string;
}

export default abstract class ErrorHandling {
    private context: MessageContextProps;

    constructor(context: MessageContextProps){
        this.context = context;
    }

    public handleError(errorMsg: string){
        context.setMessage(errorMsg);
    }
}

```

Now, all the service classes should look like the following code:

```ts
export default class JokeService extends ErrorHandling implements IService {

    constructor(context: MessageContextProps){
        super(context);
    }

    get<Joke>(type: string): Observable<Joke[]> {
        return api.get<Joke[]>(`/jokes/${type}/ten`)
            .pipe(
                catchError(err => {
                    this.handleError("Joke error");
                    return [];
                })
            );
    }
    // All the other methods
    // ...
}
```

The useService hook should be changed for the following:

```ts
export default function useService<T>(type: {new(context: MessageContextProps):  T }): T {
    const context = useContext(MessageContextProps);
    return new type(context);
}
```

And for last but not least important, we have our component with a really clean code and pretty modular:

```ts
const JokePage: React.FC = () => {
  const jokeService = useService(JokeService);

  const [jokeType, setJokeType] = useState<string>("programming")
  const [jokes, setJokes] = useState<Joke[]>([]);

  function getJokes(){
    jokeService.get<Joke>(jokeType).subscribe(jokes => setJokes(jokes));
  }

  return (
    <div>
      <select onChange={(event) => setJokeType(event.target.value)} value={jokeType}>
          <option value="programming">Programming</option>
          <option value="general">general</option>
      </select>
      <button onClick={getJokes}>Generate Random Jokes</button>
      {
        jokes.map(joke => (
          <div key={joke.id}>
            <span>{joke.punchline}</span>
            <span>{joke.setup}</span>
          </div>
        ))
      }
    </div>
  );
}
```

I know the idea can still use some improvements, but consider this a beta version. Any thoughts and tips are welcomed.

> And before I forget, about using the RxJs Observable with Axios, I followed the tutorial in this url: https://medium.com/front-end-weekly/how-to-wrap-axios-inside-rxjs-with-typescript-and-react-6c21e47dcb63
---
