-- 查询动态列表，同时展示评论数量

SELECT
	m.id id,
	m.content content,
	m.createAt createTime,
	m.updateAt updateTime,
	JSON_OBJECT( 'userId', u.id, 'userName', u.username, 'createTime', u.createAt, 'updateTime', u.updateAt ) user,
	( SELECT COUNT(*) FROM COMMENT c WHERE c.moment_id = m.id ) commentCount 
FROM
	moment m
	LEFT JOIN users u ON u.id = m.user_id 
	LIMIT 10 OFFSET 0;



-- 查询动态列表，同时展示评论列表

SELECT
	m.id,
	m.content,
	m.createAt,
	m.updateAt,
	JSON_OBJECT( 'userId', u.id, 'userName', u.username, 'createTime', u.createAt, 'updateTime', u.updateAt ) USER,
	(
		JSON_ARRAYAGG(
			JSON_OBJECT(
				'id',
				c.id,
				'content',
				c.content,
				'commentId',
				c.comment_id,
				'createTime',
				c.createAt,
				'updateTime',
				c.updateAt,
        'user', JSON_OBJECT('id', cu.id, 'userName', cu.username)
			)) 
	) commentList 
FROM
	moment m
	LEFT JOIN users u ON u.id = m.user_id
	LEFT JOIN COMMENT c ON c.moment_id = m.id
  LEFT JOIN users cu ON cu.id = c.user_id 
WHERE
	m.id = 2 
GROUP BY
	m.id; 