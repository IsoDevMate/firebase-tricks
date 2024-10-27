import { useAuth } from './context//authctx';


export const Home = () => {
  const { user } = useAuth();
 
  return (
    <>
      <section className="bg-gray-100 py-24">
        <div className="grid max-w-7xl mx-auto grid-cols-1 md:grid-cols-2 items-center">
        {user ?  <p> `Welsome {user.email} to our Homepage ` </p>: <p>Loggin to view this page</p>}
        </div>
      </section>
    </>
  );
};