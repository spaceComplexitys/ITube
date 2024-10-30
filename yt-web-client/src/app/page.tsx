import { db } from '../db';
import { postsTable, usersTable } from '../db/schema';
import styles from './page.module.css';

export default async function asyncHome() {
  // const handleSubmit = async (event: { preventDefault: () => void; }) => {
  //   event.preventDefault(); // Prevent default form submission
    
  //   await db.insert(usersTable).values({
  //     id: 1,
  //     name: "Test User", // Added name field as required
  //     age: 20,
  //     email: "test@example.com",
  //   });
  //   await db.insert(postsTable).values({
  //     title: "please subscribe",
  //     content: "yolo",
  //     userId:1 
  //   });
  // };

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>app/page.tsx</code>
        </p>
      </div>
      <div>
        <form action={async () => {
          "use server";
        }}>
          <button type="submit">Submit</button>
        </form>
      </div>
    </main>
  );
}


// Uncomment and use this if you want to insert a post entry
// await db.insert(postsTable).values({
//   title: "please subscribe",
//   content: "yolo",
//   userId: 1,
// });
// 'use server';

// import { submitUserData } from '../actions/submitUserData';
// import styles from './page.module.css';


// export default function Home() {
//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     await submitUserData(); // Call the server action
//   };

//   return (
//     <main className={styles.main}>
//       <div className={styles.description}>
//         <p>
//           Get started by editing&nbsp;
//           <code className={styles.code}>app/page.tsx</code>
//         </p>
//       </div>
//       <div>
//         <form onSubmit={handleSubmit}>
//           <button type="submit">Submit</button>
//         </form>
//       </div>
//     </main>
//   );
// }