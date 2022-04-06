import React, { useEffect, useState, useRef } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { query_cv_person } from '../graphql/queries';
import { insert_cv_person } from '../graphql/mutations';
import PersonalData from '../components/person/PersonalData';
import { Loading } from '../components/utils/Loading';
import { UserHeader } from '../libs/headers';
import { Toast } from 'primereact/toast';

const Logged = (props) => {
  const user = props?.userInfo;
  const [person, setPerson] = useState(null);
  const [addPerson, resAdd] = useMutation(insert_cv_person, UserHeader);
  const { data, loading, error } = useQuery(query_cv_person, {
    variables: { email: user.email },
    ...UserHeader,
  });
  const toast = useRef(null);

  useEffect(() => {
    if (data && !data?.cv_person.length) {
      let _person = {
        email: user?.email,
        last_name: user?.last_name,
        name: user?.name,
      };
      addPerson({ variables: { data: _person } })
        .then((data) => {
          setPerson(data.insert_cv_person_one);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      setPerson(data?.cv_person[0]);
    }
  }, [data]);

  const Alerts = (status, title, detail) => {
    toast.current.show({ severity: status, summary: title, detail: detail });
  };

  if (error) console.log('Hubo un error');
  return (
    <div className="main-content">
      <Toast ref={toast} />
      <div className="grid">
        <div className="col-12 md:col-10 md:col-offset-1">
          {!loading && person ? <PersonalData person={person} alerts={Alerts} /> : <Loading />}
        </div>
      </div>
    </div>
  );
};
export default Logged;
