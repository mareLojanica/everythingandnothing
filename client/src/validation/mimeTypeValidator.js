export const MimeTypeValidator=(header)=>{
    switch (header) {
    case "89504e47":
        return {
            success : true,
            msg : ''
        }
    case "47494638":
       return {
            success : true,
            msg : ''
        }
    case "ffd8ffe0":
    case "ffd8ffe1":
    case "ffd8ffe2":
    case "ffd8ffe3":
    case "ffd8ffe8":
    case "ffd8ffdb":
        return {
            success : true,
            msg : ''
        }
    default:
        return {
            success : false,
            msg :'You can upload only images'
        } // Or you can use the blob.type as fallback
}
}