import EditProject from "@/src/components/EditProject/EditProject";

export default function Edit_Project(props: any) {
  return (
    <section>
      <EditProject id={props.params.id} />
    </section>
  );
}
