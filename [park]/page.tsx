// 'use client';
// // import ParkDetails from './ParkDetails';

// // export default function ParkPage() {
// //   // specific park details page
// //   return;
// //   <>
// //     {' '}
// //     <h1>Hello, Next.js!</h1>;

// //   </>;
// // }
// export async function generateStaticParams() {
//   //const posts = await getPosts();

//   return [{ slug: 'adam' }];
//   // posts.map((post) => ({
//   //   slug: post.slug,
//   // }));
// }

// const parkCode = 'adam';
// async function getData() {
//   //const res = await fetch('https://api.example.com/...');
//   const res = await fetch(`https://developer.nps.gov/api/v1/parks?parkCode=${parkCode}&api_key=zLbSDcf7rYq9FzTqTDWlFOeER9ygN3vl5UtPFYuH`);

//   // The return value is *not* serialized
//   // You can return Date, Map, Set, etc.
//   return res.json();
// }

// // This is an async Server Component
// export default async function ParkDetails({ params }) {
//   const { slug } = params;
//   const data = await getData();
//   console.log('data==>', data);

//   return <main>{data}</main>;
// }
