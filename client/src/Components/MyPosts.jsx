
import { postSelector } from '../Redux/Reducers/postReducer'
import { useSelector } from 'react-redux';
import SinglePost from './SinglePost';

function MyPosts() {

    const { userPosts } = useSelector(postSelector);

    return (
        <>
            {
                userPosts.length > 0 
                ?
                userPosts
                .map((post) => <SinglePost key={post._id} post={post} />)
                :
                <h1 className='text-center'>
                    No Post
                </h1>
            }
        </>
    )
}

export default MyPosts;