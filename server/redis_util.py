import redis

def create_redis_client():
    return redis.Redis(
        host='redis-15246.c290.ap-northeast-1-2.ec2.cloud.redislabs.com',
        port=15246,
        password='j0eSSufPBijBpeqVxhKS3NtixeqaTcXf'
    )