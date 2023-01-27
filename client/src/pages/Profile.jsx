import styled from "styled-components";
import ProfileCard from "../components/ProfileCard";
import ProfileContent from "../components/ProfileContent";
import { MOBILE_POINT } from "../data/breakpoint";

const ProfileWrap = styled.div`
	display: flex;
	@media (max-width: ${MOBILE_POINT}) {
		flex-direction: column;
		width: 100%;
	}
`;

const Profile = () => {
	return (
		<ProfileWrap>
			<ProfileCard />
			<ProfileContent />
		</ProfileWrap>
	);
};

export default Profile;
