This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Assumptions
1. Team names that were submitted in the team information is the same as teams submitted in the match results.
2. Team names only consist of alphanumeric characters without whitespace.
2. Registration date format is dd/MM.
3. There are only two groups per submission, and are labelled as group 1 and 2.
4. Team information submission column headers are always in the order of ["teamName", "registrationDate", "groupNumber"]
5. Match results column headers are always in the order of ["teamOne", "teamTwo", "teamOneGoalsScored", "teamTwoGoalsScored"]