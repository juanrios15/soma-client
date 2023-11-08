import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextInput, Select, Textarea, Label, Button } from 'flowbite-react';
import { editUserDetail, getCountries, getUserDetail } from '../../api/users.api';
import { useNavigate } from 'react-router-dom';


export function EditUserForm({ profile_id }) {
  const [canEdit, setCanEdit] = useState(false);
  const [profilePicture, setProfilePicture] = useState('');
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { register, handleSubmit, reset, setValue, formState: { errors }, watch } = useForm();

  const profilePictureFile = watch('profile_picture');
  useEffect(() => {
    loadUserDetails();
    fetchCountries();
  }, []);

  useEffect(() => {
    if (profilePictureFile && profilePictureFile.length > 0) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setProfilePicture(fileReader.result);
      };
      fileReader.readAsDataURL(profilePictureFile[0]);
    }
  }, [profilePictureFile]);

  async function fetchCountries() {
    try {
      const response = await getCountries();
      const countriesArray = Object.entries(response.data).map(([value, label]) => ({
        value,
        label
      }));
      console.log('countriesArray', countriesArray)
      setCountries(countriesArray);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  }

  async function loadUserDetails() {
    try {
      const response = await getUserDetail(profile_id);
      console.log("res", response);
      if (response.data.is_self) {
        setCanEdit(true);
        setProfilePicture(response.data.profile_picture);
        reset({
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          gender: response.data.gender,
          birthday: response.data.birthday,
          biography: response.data.biography,
          country: response.data.country,
        });
      }
    } catch (error) {
      setError(error);
      console.error('Error fetching user details:', error);
    }
  }

  const onSubmit = async (formData) => {
    const dataToSend = new FormData();
    for (const key in formData) {
      if (formData[key] !== null && formData[key] !== '') {
        if (key === 'profile_picture') {
          const file = formData[key].length > 0 ? formData[key][0] : null;
          if (file) {
            dataToSend.append(key, file);
          }
        } else if (key === 'birthday') {
          const formattedDate = formData[key] ? formData[key].toISOString().split('T')[0] : null;
          if (formattedDate) {
            dataToSend.append(key, formattedDate);
          }
        } else {
          dataToSend.append(key, formData[key]);
        }
      }
    }
    try {
      const response = await editUserDetail(profile_id, dataToSend);
      console.log(response);
      navigate(`/profile/${profile_id}`);
    } catch (error) {
      setError(error);
      console.error('Error updating profile:', error);
      alert('An error occurred while updating the profile.');
    }
  };

  if (error) {
    return <div>An error occurred: {error.message}</div>;
  }
  if (!canEdit) {
    return <div>You do not have permission to edit this profile.</div>;
  }
  return (
    <div className="container mx-auto p-4">
      {profilePicture && (
        <div className="mb-4">
          <img src={profilePicture} alt="Profile" className="rounded-full w-32 h-32" />
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="space-y-4">
        <div>
          <Label htmlFor="first_name">First Name</Label>
          <TextInput
            id="first_name"
            type="text"
            {...register('first_name')}
            helperText={errors.first_name && errors.first_name.message}
          />
        </div>
        <div>
          <Label htmlFor="last_name">Last Name</Label>
          <TextInput
            id="last_name"
            type="text"
            {...register('last_name')}
            helperText={errors.last_name && errors.last_name.message}
          />
        </div>
        <div>
          <Label htmlFor="gender">Gender</Label>
          <Select id="gender" {...register('gender')}>
            <option value="">Select gender...</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
            <option value="O">Other</option>
          </Select>
        </div>
        <div>
          <Label htmlFor="birthday">Birthday</Label>
          <TextInput
            id="birthday"
            type="date"
            {...register('birthday')}
          />
        </div>
        <div>
          <Label htmlFor="profile_picture">Profile Picture</Label>
          <TextInput
            id="profile_picture"
            type="file"
            {...register('profile_picture')}
          />
        </div>
        <div>
          <Label htmlFor="country">Country</Label>
          <Select id="country" {...register('country')}>
            <option value="">Select a country...</option>
            {countries.map((country) => (
              <option key={country.value} value={country.value}>
                {country.label}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <Label htmlFor="biography">Biography</Label>
          <Textarea
            id="biography"
            {...register('biography')}
          />
        </div>
        <Button type="submit">Update Profile</Button>
      </form>
    </div>
  );
}
