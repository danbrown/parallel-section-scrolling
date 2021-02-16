import { useRouter } from "next/router";
import Head from "next/head";

export default function Hello(props: any) {
  const { car } = props;
  const router = useRouter();
  const { id, Name } = router.query;

  return (
    <>
      <Head>
        <title>{car?.Name} - Cars List</title>
      </Head>
      <h1>Hello {car?.Name}</h1>
      <br />
      <img
        src={`${process.env.API_URL}${car?.Image.formats.medium.url}`}
        alt=""
      />
      <p>{JSON.stringify(car)}</p>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const { params } = context;

  const req = await fetch(`${process.env.API_URL}/cars?Name=${params.id}`);
  const data = await req.json();

  return {
    props: {
      car: data[0],
    },
  };
}

// export async function getStaticProps({ params }) {
//   const req = await fetch(`http://localhost:1337/cars/${params.id}`);
//   const data = await req.json();

//   console.log(data);
//   return {
//     props: {
//       car: data,
//     },
//   };
// }

// export async function getStaticPaths() {
//   const req = await fetch(`http://localhost:1337/cars`);
//   const data = await req.json();

//   const paths = data.map((item) => {
//     return { params: { id: item._id } };
//   });

//   return { paths, fallback: false };
// }
