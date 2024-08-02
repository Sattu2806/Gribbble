import axios from "axios"

export const UploadMedia = async (formData: FormData) : Promise<{url:string}> => {
    const file = formData.get('file') as File

    formData.append('upload_preset', `${process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}`)

    if(!file){
        throw new Error('No file provided')
    }

    console.log(process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET)

    let cloudinaryUploadUrl = ''
    

    const fileType = file.type.split('/')[0]

    if(fileType === 'image'){
        cloudinaryUploadUrl = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL}/image/upload`
    } else if(fileType === 'video'){
        cloudinaryUploadUrl = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL}/video/upload`
    } else {
        throw new Error('Unsupported file type')
    }

    try {
        const response = await axios.post(cloudinaryUploadUrl,formData,{
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        }) 

        return {url: response.data.url}
    } catch (error) {
        console.log("Error uploading cloudinary",error)
        throw error
    }
}