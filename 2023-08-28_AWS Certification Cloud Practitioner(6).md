
### IAM 소개 : 사용자, 그룹, 정책

1. 정의
	- IAM이란 Identity and Access Management의 약자로 사용자를 생성하고, 그룹에 배치하며 AWS에서는 글로벌서비스로 분류된다.
2. 설명
	- 사용자는 특정 그룹에 속해있을 수 있으며 여러개의 그룹에 속해있을 수 있다.
	- 그룹 안에 그룹은 불가능하다.
	- 그룹에 속해있지 않은 사용자도 존재할 수 있다.(권장하지는 않음)
	- JSON파일로 그룹 및 사용자에 대한 접근 권한을 설정할 수 있다.

### IAM 사용자 및 그룹 실습

1. IAM 콘솔

	AWS 웹에 접속하여 IAM 콘솔로 이동한다.


	![IAM 콘솔 이동 방법](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/898302c9-16e6-43c4-b1cc-a4902aa78e66/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230828%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230828T095347Z&X-Amz-Expires=3600&X-Amz-Signature=273d386d0001f989ddce8a6d41808abe83fb4d33630ce4c2a1bc6677def2fe7f&X-Amz-SignedHeaders=host&x-id=GetObject)


	IAM 대시보드


	![IAM은 글로벌 서비스 이므로 별도의 리전을 선택하지 않아도 된다.](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/35fc488c-5a44-4a34-8996-bec46487ade3/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230828%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230828T095347Z&X-Amz-Expires=3600&X-Amz-Signature=6807e823f54b4af551bcdd1afa0eba4fc7cebe9aeac88bda277fd97fdb477ab5&X-Amz-SignedHeaders=host&x-id=GetObject)

2. 유저 생성

	사용자 추가


	![사용자 추가](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/3e88f7dc-7883-43ea-8f15-d4aa7c2e9798/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230828%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230828T095347Z&X-Amz-Expires=3600&X-Amz-Signature=2f85675865159e40c072a6ed3bcbee864b1a32124179026ed1f964500d6a02c5&X-Amz-SignedHeaders=host&x-id=GetObject)


	※ 왜 사용자를 추가해야할까?

		- 기본적으로 처음 AWS계정을 생성하면 해당 계정은 Root계정이 된다.
		- Root계정은 계정에대한 모든 권한을 가지고있기 때문에 무엇이든지 할 수 잇으며 상황에 따라 위험한 계정이 될 수 있다.(보안상의 이유)
		- 그렇기 때문에 별도의 관리자 계정을 만들어서 사용하는것이 좋다.

	사용자 이름 설정


	![추가 할 사용자 이름을 입력 후 체크박스 체크를 활성화 한다.](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/38198285-817b-4dc4-a5ee-c37a038cc8f5/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230828%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230828T095347Z&X-Amz-Expires=3600&X-Amz-Signature=0668821a69b37f08d7af2328749aa67595a1db19fa91a0162c6a345578a4fe19&X-Amz-SignedHeaders=host&x-id=GetObject)


	사용자 계정 설정(비밀번호 등)


	![“IAM 사용자를 생성하고 싶음” 체크박스를 체크 후 “사용자 지정 암호” 를 체크한다.
	사용 할 비밀번호를 입력 후에 “사용자는 다음 로그인 시 새 암호를 생성해야 합니다” 체크를 해제한 뒤에 ”다음” 버튼을 클릭하여 권한 설정 화면으로 넘어간다.](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/09447976-6436-4beb-83aa-e4d6048cf5fb/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230828%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230828T095347Z&X-Amz-Expires=3600&X-Amz-Signature=a7a01eb8abf5fbdc0fae70685cf32efe44fbf67c35f0f4d9f8ed9ab26335fc2f&X-Amz-SignedHeaders=host&x-id=GetObject)


	권한 및 그룹설정


	![“그룹에 사용자 추가” 를 체크 후 “그룹 생성” 버튼을 클릭한다.](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/37a1392c-abce-4786-88c0-a3b0d3d48a9b/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230828%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230828T095347Z&X-Amz-Expires=3600&X-Amz-Signature=cf03a2617b35c6cbd834a0b828dfe2d7d47b64e6ed7ce76e5fd7a1de05abfa7b&X-Amz-SignedHeaders=host&x-id=GetObject)


	그룹에 권한 설정


	![사용 할 그룹 이름을 작성 후 “AdministratorAccess” 권한을 체크한다. 우측의 + 버튼을 클릭해 JSON 파일을 확인할 수 있다. 이후 “사용자 그룹 생성” 버튼을 클릭해 그룹을 생성한다.](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/8776799a-3b66-473e-9764-b1796940fe18/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230828%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230828T095347Z&X-Amz-Expires=3600&X-Amz-Signature=62bfb86205a72a70e31d51067ce1496046194a84191df64ee964147dadc7b1cd&X-Amz-SignedHeaders=host&x-id=GetObject)


	※ 해당 그룹에 속해있는 사용자는 그룹에 부여된 권한을 승계한다. 또한 권한은 정책을 통해 정의된다.


	그룹이름 및 정책 확인


	![그룹이 정상적으로 생성되었고, 생성시 작성한 그룹 명과 연결된 정책 명이 정상적으로 반영 되었다면  “다음” 버튼을 클릭하여 “검토 및 생성” 화면으로 이동한다.](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/f253fde1-3b46-4270-a4bb-5d9a3b08c9f3/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230828%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230828T095347Z&X-Amz-Expires=3600&X-Amz-Signature=e7e06f83faf0c919a78ab2eb23b22a6a8dcd3269b9617b3a6634989a87f55afe&X-Amz-SignedHeaders=host&x-id=GetObject)


	검토 및 생성


	![현재 화면에서 “새 태그 추가” 버튼을 클릭하여 태그를 추가한다.](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/d0682e42-12b8-4e16-82df-ff8752009075/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230828%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230828T095347Z&X-Amz-Expires=3600&X-Amz-Signature=6a201de61a2e9e203f2eee2b704d3b3fc5f42970e20f01dab967c53b191f4c18&X-Amz-SignedHeaders=host&x-id=GetObject)


	※태그란?

		- 태그란 AWS 전역에서 찾을 수 있는 사용자 지정 키-밸류의 정보이며 사용자의 접근을 추적, 조직, 제어 할 수 있도록 도와주는 부가적인 정보이다.
		- 즉, 태그는 사용자에 대한 추가적인 정보 이다.

	태그 생성하기


	![태그에 사용 할 “키” 와 “값” 이 설정되었다면 “사용자 생성” 버튼을 클릭](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/cadeebdc-f2b1-4aa4-a519-0c969156587e/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230828%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230828T095347Z&X-Amz-Expires=3600&X-Amz-Signature=e5fd943f5900e8732f944a2dc287df5246e77dbad73786ef5b09391617360188&X-Amz-SignedHeaders=host&x-id=GetObject)


	생성한 사용자 확인 및 비밀번호 다운로드


	![비밀번호는 사용자 생성 후 단 한번만 다운로드가 가능하기 때문에 “.csv 파일 다운로드” 버튼을 클릭하여 별도로 보관하는 것이 좋다. 다운로드가 완료되면 “사용자 보기” 버튼을 클릭해 생성한 사용자에 대한 세부 정보를 확인할 수 있다.](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/102361d6-dd30-4c2c-bdf1-3b9d3c7b0ae8/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230828%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230828T095347Z&X-Amz-Expires=3600&X-Amz-Signature=2b036a52d228f9b8a9db07d6620496711efad694f8bee94b1dab383162f919bb&X-Amz-SignedHeaders=host&x-id=GetObject)


	사용자 세부정보


	![사용자 생성시 사용했던 태그 및 기타 정보를 확인할 수 있다.](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/9a26c4a9-9db5-4385-bbd5-edeb4b43a050/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230828%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230828T095347Z&X-Amz-Expires=3600&X-Amz-Signature=1094b193950ff9fd1785b5d3ef05bf6ce1ec3e50a58cde9c186e05f0266a91eb&X-Amz-SignedHeaders=host&x-id=GetObject)

3. 그룹에 사용자 추가

	그룹 탭 접속하기


	![“사용자 그룹” 탭에 생성한 “그룹 이름” 을 클릭하여 “요약” 창으로 이동한다](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/3c57f0a5-9f9e-4daf-9fa8-b96cc4ab03a0/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230828%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230828T095349Z&X-Amz-Expires=3600&X-Amz-Signature=811084369f533c6ada8ccf5a8796266b8520b9d5ab1301f854548896d1aceabb&X-Amz-SignedHeaders=host&x-id=GetObject)


	그룹에 사용자 추가하기


	![“사용자 추가” 버튼을 클릭한다.](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/97e9ca10-1837-47bc-a12f-d32a21d2c153/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230828%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230828T095349Z&X-Amz-Expires=3600&X-Amz-Signature=544477c7f6103915f46f0ad64ba02a61a1dd0c3399b38daa8b0e2b521947083e&X-Amz-SignedHeaders=host&x-id=GetObject)


	![그룹에 추가 할 사용자를 체크 후 “사용자 추가” 버튼을 클릭한다.](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/c86a973b-f14f-4fb9-9901-3fc57c5b4923/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230828%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230828T095349Z&X-Amz-Expires=3600&X-Amz-Signature=c2d2d52aa3469fc79a4c7a0d46865db673355db7f1223c02599390acf3c534a9&X-Amz-SignedHeaders=host&x-id=GetObject)


	![사용자가 정상적으로 그룹에 추가되었다면 하단에 사용자가 표시된다.](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/00331435-5d35-4c0d-aa74-862f5df85bfa/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230828%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230828T095349Z&X-Amz-Expires=3600&X-Amz-Signature=2b2f6bcc741ab13f2b1d5cb03cedd2c271fc676441d08c2505a93cc2ce535c27&X-Amz-SignedHeaders=host&x-id=GetObject)


	사용자 권한 확인하기


	![위에서 확인했던 방법대로 사용자 정보를 확인해보면 방금 전과 다르게 사용자 권한에 그룹 정책이 연결 되었음과 그룹이 표시되는 것을 확인할 수 있다.](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/c77d7556-6f75-407f-9138-3fff7ad2c5e7/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230828%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230828T095349Z&X-Amz-Expires=3600&X-Amz-Signature=a510cb07ac190902d647b4f6cf0dc57582ae2322df9dcd0841af2ed6f5e3ae4b&X-Amz-SignedHeaders=host&x-id=GetObject)

1. 생성한 사용자로 로그인 하기

	사용자 계정 별칭 설정하기


	![“대시보드” 탭의 우측 계정 별칭 탭의 “생성” 버튼을 클릭하여 IAM으로 로그인 할 별칭을 생성한다.](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/5ffd4c94-438d-4d25-a116-7d4626a87386/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230828%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230828T095350Z&X-Amz-Expires=3600&X-Amz-Signature=52932741b42c2951d25190dfa34a2aea07eb8f5a618aead5ebbd732bae40a5c0&X-Amz-SignedHeaders=host&x-id=GetObject)


	로그인 URL 복사하기


	![설정한 별칭이 정상적으로 적용 되었다면 별칭과 로그인 URL의 시작 URL이 변경되었을 것이다.
	복사 버튼을 클릭하여 새로운 브라우저로 해당 URL로 이동한다.](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/e80e5ad0-8e2d-4526-bd70-69498b7913e4/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230828%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230828T095349Z&X-Amz-Expires=3600&X-Amz-Signature=abe1f60b377718cbd27941d4e9294cb45f34a1d59374763ee04d90110a75ef07&X-Amz-SignedHeaders=host&x-id=GetObject)


	로그인 하기


	![복사한 URL로 이동하면 위와 같이 특정 페이지로 리다이렉션 되며 자동으로 계정 별칭이 채워진 상태, 위와같은 화면이 보일 것이다. 방금 생성한 사용자이름, 암호를 입력하여 로그인 한다.](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/1026750c-f5c9-4b4b-b96b-ff0bf80fa093/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230828%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230828T095349Z&X-Amz-Expires=3600&X-Amz-Signature=ebe8e1e387f4d41773a95f9a668804bc0c48b0be651e1da8f542e9f2afee2d6f&X-Amz-SignedHeaders=host&x-id=GetObject)


	로그인 성공


	![로그인에 성공 되었다면 위와같은 화면이 보일 것이다. ](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/0c1de681-2f2a-461a-9e74-68d18903bc28/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230828%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230828T095349Z&X-Amz-Expires=3600&X-Amz-Signature=6521e883d160a060ba6b690fef4eb7e2b2349e57586719277d2f9ddeccef7b33&X-Amz-SignedHeaders=host&x-id=GetObject)

