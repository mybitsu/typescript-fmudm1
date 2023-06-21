import { forkJoin, interval, of, throwError } from 'rxjs';
import { take, delay, map, catchError } from 'rxjs/operators';

const numbers = interval(1000);

const takeFourNumbers = numbers.pipe(take(4));

//takeFourNumbers.subscribe(x => console.log('Next: ', x));

const promises = {
  p01: interval(500).pipe(take(5), delay(100)),
  p02: interval(1000).pipe(take(2), delay(100)),
  p03: interval(100)
    .pipe(take(7))
    .pipe(
      map((x) => {
        if (x > 5) {
          throwError('X is too large.');
        } else {
          return x;
        }
      })
    ),
};

const promises2 = {
  p01: of(1),
  p02: of(2),
  p03: of(3).pipe(
    map((x) => {
      if (x == 3) {
        throw new Error('X is too large.');
      } else {
        return x;
      }
    })
  ),
};

const fj = forkJoin(promises2);

fj.subscribe({
  next: console.log,
  error: (x) => {
    console.log('Error caught: ' + x);
  },
  complete: () => console.log('Complete'),
});
