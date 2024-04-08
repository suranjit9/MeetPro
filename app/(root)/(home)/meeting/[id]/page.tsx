const Meeting = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <h1 className="text-5xl">Metting room {params.id}</h1>
    </div>
  );
};

export default Meeting;
